"""Risiko vs avkastning — høyrente er garanti, fond svinger, buffer er kontant."""

from __future__ import annotations

from dataclasses import dataclass
from math import sqrt

from dnbglobalindeks import FUND as GLOBAL_FUND
from dnbteknologi import FUND as TECH_FUND
from hoyrente import ACCOUNT as HOYRENTE
from monthlyinvesting import OVERFLOW_TO_GLOBAL, SPAREAVTALER, TARGET_BUFFER

FUND_CORRELATION = 0.75


@dataclass(frozen=True)
class Strategy:
    name: str
    risk: str
    why: str
    balances: dict
    spareavtaler: dict


def _weights(balances: dict) -> dict[str, float]:
    total = max(sum(balances.values()), 1)
    return {key: amount / total for key, amount in balances.items()}


def portfolio_stats(balances: dict) -> dict:
    weights = _weights(balances)
    total = sum(balances.values())
    expected = (
        weights["dnb_global_indeks"] * GLOBAL_FUND.expected_annual_return
        + weights["dnb_teknologi"] * TECH_FUND.expected_annual_return
        + weights["hoyrente"] * HOYRENTE.annual_rate
    )
    vol = sqrt(
        (weights["dnb_global_indeks"] * GLOBAL_FUND.annual_volatility) ** 2
        + (weights["dnb_teknologi"] * TECH_FUND.annual_volatility) ** 2
        + 2
        * weights["dnb_global_indeks"]
        * weights["dnb_teknologi"]
        * FUND_CORRELATION
        * GLOBAL_FUND.annual_volatility
        * TECH_FUND.annual_volatility
    )
    guaranteed = balances["hoyrente"]
    cash = balances["buffer"]
    market = balances["dnb_global_indeks"] + balances["dnb_teknologi"]
    excess = expected - HOYRENTE.annual_rate
    score = excess / vol if vol > 1e-9 else excess
    yearly_fee = (
        balances["dnb_global_indeks"] * GLOBAL_FUND.annual_fee
        + balances["dnb_teknologi"] * TECH_FUND.annual_fee
    )
    return {
        "total": total,
        "expected": expected,
        "volatility": vol,
        "weak_year": expected - vol,
        "strong_year": expected + vol,
        "guaranteed": guaranteed,
        "cash": cash,
        "market": market,
        "score": score,
        "weights": weights,
        "yearly_fee": yearly_fee,
        "tech_share": balances["dnb_teknologi"] / total,
    }


def apply_overflow(balances: dict, to_global: float = OVERFLOW_TO_GLOBAL) -> dict:
    moved = dict(balances)
    overflow = max(0, moved["buffer"] - TARGET_BUFFER)
    global_part = round(overflow * to_global)
    tech_part = overflow - global_part
    moved["buffer"] -= overflow
    moved["dnb_global_indeks"] += global_part
    moved["dnb_teknologi"] += tech_part
    return moved


def monthly_rate(annual: float) -> float:
    return (1 + annual) ** (1 / 12) - 1


def future_value(principal: float, annual: float, months: int, pmt: float = 0) -> float:
    rate = monthly_rate(annual)
    if months <= 0:
        return principal
    grown = principal * (1 + rate) ** months
    if pmt == 0:
        return grown
    if rate == 0:
        return grown + pmt * months
    return grown + pmt * (((1 + rate) ** months - 1) / rate)


def _fund_return(annual: float, volatility: float, path: str) -> float:
    if path == "weak":
        return max(annual - volatility, -0.3)
    if path == "strong":
        return annual + volatility
    return annual


def project_path(balances: dict, spareavtaler: dict, years: int, path: str) -> dict:
    months = years * 12
    global_value = future_value(
        balances["dnb_global_indeks"],
        _fund_return(
            GLOBAL_FUND.expected_annual_return, GLOBAL_FUND.annual_volatility, path
        ),
        months,
        spareavtaler["dnb_global_indeks"],
    )
    tech_value = future_value(
        balances["dnb_teknologi"],
        _fund_return(
            TECH_FUND.expected_annual_return, TECH_FUND.annual_volatility, path
        ),
        months,
        spareavtaler["dnb_teknologi"],
    )
    hoyrente_value = future_value(balances["hoyrente"], HOYRENTE.annual_rate, months)
    buffer_value = balances["buffer"]
    return {
        "dnb_global_indeks": global_value,
        "dnb_teknologi": tech_value,
        "hoyrente": hoyrente_value,
        "buffer": buffer_value,
        "total": global_value + tech_value + hoyrente_value + buffer_value,
    }


def strategies(balances: dict, spareavtaler: dict | None = None) -> list[Strategy]:
    """Konkrete oppsett uten at du må endre tall manuelt."""
    spareavtaler = dict(spareavtaler or SPAREAVTALER)
    current = dict(balances)
    overflow = max(0, current["buffer"] - TARGET_BUFFER)

    only_global = dict(current)
    only_global["buffer"] -= overflow
    only_global["dnb_global_indeks"] += overflow

    to_hoyrente = dict(current)
    to_hoyrente["buffer"] -= overflow
    to_hoyrente["hoyrente"] += overflow

    no_hoyrente = dict(current)
    shifted = no_hoyrente["hoyrente"]
    no_hoyrente["hoyrente"] = 0
    no_hoyrente["buffer"] -= overflow
    no_hoyrente["dnb_global_indeks"] += shifted + overflow

    exit_tech = dict(current)
    tech_held = exit_tech["dnb_teknologi"]
    exit_tech["dnb_teknologi"] = 0
    exit_tech["buffer"] -= overflow
    exit_tech["dnb_global_indeks"] += overflow + tech_held

    global_sparing = dict(spareavtaler)
    global_sparing["dnb_global_indeks"] = sum(spareavtaler.values())
    global_sparing["dnb_teknologi"] = 0

    extra_tech_monthly = dict(spareavtaler)
    extra_tech_monthly["dnb_teknologi"] = spareavtaler["dnb_teknologi"] + 1_000

    return [
        Strategy(
            name="Nåværende",
            risk="middels",
            why="50k buffer og 50k høyrente. Teknologi 30k + 1 000 kr/mnd (høyest svingning og 1,15 % kostnad).",
            balances=current,
            spareavtaler=dict(spareavtaler),
        ),
        Strategy(
            name="Uten høyrente → alt i global",
            risk="middels+",
            why="50k høyrente og 20k buffer-overskudd inn i DNB Global Indeks. Ingen garantert rente, mer i indeks.",
            balances=no_hoyrente,
            spareavtaler=dict(spareavtaler),
        ),
        Strategy(
            name="Buffer-tak → kun global",
            risk="middels−",
            why="20k over 30k inn i indeksfondet (0,20 % kostnad). Høyrente og teknologi uendret.",
            balances=only_global,
            spareavtaler=dict(spareavtaler),
        ),
        Strategy(
            name="Trygg: buffer-tak → høyrente",
            risk="lav",
            why="20k inn på 4,85 % garanti. Lavest avkastning, ingen fondssvingning på den biten.",
            balances=to_hoyrente,
            spareavtaler=dict(spareavtaler),
        ),
        Strategy(
            name="Ut av teknologi",
            risk="lav+",
            why="Selg 30k teknologi + 20k buffer inn i global. Unngår 1,15 % kostnad og ~22 % svingning.",
            balances=exit_tech,
            spareavtaler=global_sparing,
        ),
        Strategy(
            name="Spareavtale kun global",
            risk="middels−",
            why="Beholdning som nå, men 4 000 kr/mnd kun i indeks i stedet for 1 000 kr i teknologi.",
            balances=current,
            spareavtaler=global_sparing,
        ),
        Strategy(
            name="Øk teknologi månedlig (+1 000)",
            risk="høy",
            why="Global-sparing uendret (3 000). Teknologi økes til 2 000 kr/mnd fra overskudd — ikke flyttet fra indeks.",
            balances=current,
            spareavtaler=extra_tech_monthly,
        ),
    ]
