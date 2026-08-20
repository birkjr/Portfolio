"""Lagrer månedlig historikk lokalt (ikke på nettsiden)."""

from __future__ import annotations

import json
from copy import deepcopy
from datetime import date
from pathlib import Path

from dnbglobalindeks import FUND as GLOBAL_FUND
from dnbteknologi import FUND as TECH_FUND
from hoyrente import ACCOUNT as HOYRENTE
from monthlyinvesting import INCOME, SPAREAVTALER, STARTING_BUFFER, TARGET_BUFFER, total_income
from monthlyoutgoings import EXPENSES, total_expenses
from risk import apply_overflow

STATE_PATH = Path(__file__).resolve().parent / "state.json"


def default_state() -> dict:
    return {
        "balances": {
            "dnb_global_indeks": GLOBAL_FUND.starting_balance,
            "dnb_teknologi": TECH_FUND.starting_balance,
            "hoyrente": HOYRENTE.starting_balance,
            "buffer": STARTING_BUFFER,
        },
        "plan": {
            "income": dict(INCOME),
            "expenses": dict(EXPENSES),
            "spareavtaler": dict(SPAREAVTALER),
        },
        "months": [],
    }


def load_state() -> dict:
    if not STATE_PATH.exists():
        return default_state()
    with STATE_PATH.open(encoding="utf-8") as handle:
        stored = json.load(handle)
    state = default_state()
    state["balances"].update(stored.get("balances", {}))
    plan = stored.get("plan", {})
    for key in ("income", "expenses", "spareavtaler"):
        if key in plan:
            state["plan"][key].update(plan[key])
    state["months"] = stored.get("months", [])
    return state


def save_state(state: dict) -> None:
    with STATE_PATH.open("w", encoding="utf-8") as handle:
        json.dump(state, handle, indent=2, ensure_ascii=False)
        handle.write("\n")


def current_month_id(today: date | None = None) -> str:
    today = today or date.today()
    return today.strftime("%Y-%m")


def month_already_closed(state: dict, month_id: str | None = None) -> bool:
    month_id = month_id or current_month_id()
    return any(entry["id"] == month_id for entry in state["months"])


def planned_surplus(state: dict) -> float:
    plan = state["plan"]
    return (
        sum(plan["income"].values())
        - sum(plan["expenses"].values())
        - sum(plan["spareavtaler"].values())
    )


def close_month(state: dict, month_id: str | None = None) -> dict:
    """Registrerer måneden: spareavtaler inn i fond, overskudd inn i buffer.

    Første måned: buffer-taket er pauset (du fordeler selv).
    Senere: overskudd øker buffer; alt over 30 000 går i fond 3:1.
    """
    month_id = month_id or current_month_id()
    if month_already_closed(state, month_id):
        raise ValueError(f"{month_id} er allerede registrert.")

    plan = state["plan"]
    income = sum(plan["income"].values())
    expenses = sum(plan["expenses"].values())
    saved_global = plan["spareavtaler"]["dnb_global_indeks"]
    saved_tech = plan["spareavtaler"]["dnb_teknologi"]
    surplus = income - expenses - saved_global - saved_tech
    is_first_month = len(state["months"]) == 0

    balances_before = deepcopy(state["balances"])
    state["balances"]["dnb_global_indeks"] += saved_global
    state["balances"]["dnb_teknologi"] += saved_tech
    state["balances"]["buffer"] += surplus

    overflow = 0.0
    to_global = 0.0
    to_tech = 0.0
    if not is_first_month and state["balances"]["buffer"] > TARGET_BUFFER:
        before_rule = state["balances"]["buffer"]
        state["balances"] = apply_overflow(state["balances"])
        overflow = before_rule - state["balances"]["buffer"]
        to_global = state["balances"]["dnb_global_indeks"] - (
            balances_before["dnb_global_indeks"] + saved_global
        )
        to_tech = state["balances"]["dnb_teknologi"] - (
            balances_before["dnb_teknologi"] + saved_tech
        )

    entry = {
        "id": month_id,
        "income": income,
        "expenses": expenses,
        "saved_global": saved_global,
        "saved_tech": saved_tech,
        "surplus": surplus,
        "first_month": is_first_month,
        "buffer_overflow": overflow,
        "overflow_global": to_global,
        "overflow_tech": to_tech,
        "balances_before": balances_before,
        "balances_after": deepcopy(state["balances"]),
    }
    state["months"].append(entry)
    save_state(state)
    return entry


def set_balance(state: dict, key: str, amount: float) -> None:
    if key not in state["balances"]:
        raise KeyError(f"Ukjent beholdning: {key}")
    state["balances"][key] = amount
    save_state(state)


def set_plan_item(state: dict, group: str, key: str, amount: float) -> None:
    if group not in state["plan"] or key not in state["plan"][group]:
        raise KeyError(f"Ukjent planfelt: {group}.{key}")
    state["plan"][group][key] = amount
    save_state(state)


def defaults_snapshot() -> dict:
    return {
        "income": total_income(),
        "expenses": total_expenses(),
        "spareavtaler": sum(SPAREAVTALER.values()),
    }
