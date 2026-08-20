"""
Lokal sparekalkulator — kjør fra denne mappen:

    python3 main.py
    python3 main.py 1
    python3 main.py 10
    python3 main.py close
    python3 main.py history
    python3 main.py set global 205000
    python3 main.py set tech 32000
    python3 main.py set buffer 45000
    python3 main.py set hoyrente 50000
    python3 main.py compare
    python3 main.py 5 compare

Husker måneder i state.json (ikke på nettsiden).
"""

from __future__ import annotations

import argparse
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from dnbglobalindeks import FUND as GLOBAL_FUND
from dnbteknologi import FUND as TECH_FUND
from hoyrente import ACCOUNT as HOYRENTE
from ledger import (
    close_month,
    current_month_id,
    load_state,
    month_already_closed,
    planned_surplus,
    set_balance,
    set_plan_item,
)
from monthlyinvesting import TARGET_BUFFER
from risk import project_path, portfolio_stats, strategies

BALANCE_ALIASES = {
    "global": "dnb_global_indeks",
    "tech": "dnb_teknologi",
    "teknologi": "dnb_teknologi",
    "hoyrente": "hoyrente",
    "buffer": "buffer",
}

PLAN_ALIASES = {
    "leieinntekt": ("income", "leieinntekt"),
    "stipend": ("income", "stipend"),
    "leie": ("expenses", "leie"),
    "mat": ("expenses", "mat"),
    "kollektiv": ("expenses", "kollektiv_og_strom"),
    "global-sparing": ("spareavtaler", "dnb_global_indeks"),
    "tech-sparing": ("spareavtaler", "dnb_teknologi"),
}


def nok(amount: float) -> str:
    rounded = round(amount)
    formatted = f"{rounded:,}".replace(",", " ")
    return f"{formatted} kr"


def pct(rate: float, digits: int = 2) -> str:
    return f"{rate * 100:.{digits}f} %".replace(".", ",")


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


def lock_unlocks() -> date:
    month = HOYRENTE.lock_start.month + HOYRENTE.lock_months
    year = HOYRENTE.lock_start.year + (month - 1) // 12
    month = (month - 1) % 12 + 1
    return date(year, month, HOYRENTE.lock_start.day)


def expected_month_return(balances: dict) -> float:
    return (
        balances["dnb_global_indeks"] * monthly_rate(GLOBAL_FUND.expected_annual_return)
        + balances["dnb_teknologi"] * monthly_rate(TECH_FUND.expected_annual_return)
        + balances["hoyrente"] * (HOYRENTE.annual_rate / 12)
    )


def analyze_trend(months: list[dict]) -> str:
    if len(months) < 2:
        return "For lite historikk til mønstre ennå — registrer måneder med `python main.py close`."

    last_three = months[-3:]
    surpluses = [entry["surplus"] for entry in last_three]
    avg = sum(surpluses) / len(surpluses)
    first, latest = surpluses[0], surpluses[-1]

    if avg < 0:
        return (
            f"Siste {len(surpluses)} mnd: underskudd {nok(avg)} i snitt. "
            "Vurder å senke spareavtalene midlertidig."
        )
    if latest > first * 1.15 and avg >= 2_000:
        extra_global = round(avg * 0.75 / 100) * 100
        extra_tech = round(avg * 0.25 / 100) * 100
        return (
            f"Overskuddet øker ({nok(avg)} i snitt). "
            f"Kan øke sparing med ca. {nok(extra_global)} global + {nok(extra_tech)} teknologi."
        )
    if avg >= 2_000:
        return (
            f"Stabilt overskudd på {nok(avg)} i snitt. "
            "Kan ligge i buffer, eller splittes 3:1 global/teknologi som spareavtalene."
        )
    return f"Siste {len(surpluses)} mnd: overskudd {nok(avg)} i snitt. Hold planen, juster når det svinger mer."


def print_overview(state: dict, years: int) -> None:
    balances = state["balances"]
    plan = state["plan"]
    income = sum(plan["income"].values())
    expenses = sum(plan["expenses"].values())
    savings = sum(plan["spareavtaler"].values())
    surplus = planned_surplus(state)
    total = sum(balances.values())
    month_gain = expected_month_return(balances)
    unlock = lock_unlocks()
    months = years * 12
    stats = portfolio_stats(balances)
    first_month_pending = len(state["months"]) == 0

    projected_global = future_value(
        balances["dnb_global_indeks"],
        GLOBAL_FUND.expected_annual_return,
        months,
        plan["spareavtaler"]["dnb_global_indeks"],
    )
    projected_tech = future_value(
        balances["dnb_teknologi"],
        TECH_FUND.expected_annual_return,
        months,
        plan["spareavtaler"]["dnb_teknologi"],
    )
    projected_hoyrente = future_value(
        balances["hoyrente"], HOYRENTE.annual_rate, months
    )
    projected_total = (
        projected_global + projected_tech + projected_hoyrente + balances["buffer"]
    )
    weak_total = (
        future_value(
            balances["dnb_global_indeks"],
            max(GLOBAL_FUND.expected_annual_return - GLOBAL_FUND.annual_volatility, -0.3),
            months,
            plan["spareavtaler"]["dnb_global_indeks"],
        )
        + future_value(
            balances["dnb_teknologi"],
            max(TECH_FUND.expected_annual_return - TECH_FUND.annual_volatility, -0.3),
            months,
            plan["spareavtaler"]["dnb_teknologi"],
        )
        + projected_hoyrente
        + balances["buffer"]
    )
    strong_total = (
        future_value(
            balances["dnb_global_indeks"],
            GLOBAL_FUND.expected_annual_return + GLOBAL_FUND.annual_volatility,
            months,
            plan["spareavtaler"]["dnb_global_indeks"],
        )
        + future_value(
            balances["dnb_teknologi"],
            TECH_FUND.expected_annual_return + TECH_FUND.annual_volatility,
            months,
            plan["spareavtaler"]["dnb_teknologi"],
        )
        + projected_hoyrente
        + balances["buffer"]
    )

    print()
    print(f"  SPARING — {current_month_id()}")
    print("  " + "─" * 52)
    print()
    print("  Portefølje (nå)")
    print(
        f"    {GLOBAL_FUND.name:<22} {nok(balances['dnb_global_indeks']):>14}   "
        f"{pct(GLOBAL_FUND.expected_annual_return)}/år  svingning ~{pct(GLOBAL_FUND.annual_volatility, 0)}"
    )
    print(
        f"    {TECH_FUND.name:<22} {nok(balances['dnb_teknologi']):>14}   "
        f"{pct(TECH_FUND.expected_annual_return)}/år  svingning ~{pct(TECH_FUND.annual_volatility, 0)}"
    )
    print(
        f"    {HOYRENTE.name:<22} {nok(balances['hoyrente']):>14}   "
        f"{pct(HOYRENTE.annual_rate)}/år  100 % garanti, bundet til {unlock.strftime('%b %Y').lower()}"
    )
    print(f"    {'Buffer':<22} {nok(balances['buffer']):>14}   0 %  (kontant, kan minke/vokse)")
    print(f"    {'Totalt':<22} {nok(total):>14}")
    print()
    print("  Risiko")
    print(f"    Garanti (høyrente)       {nok(stats['guaranteed']):>14}   {pct(stats['weights']['hoyrente'])} av alt")
    print(f"    Kontant buffer           {nok(stats['cash']):>14}   {pct(stats['weights']['buffer'])} av alt")
    print(f"    Marked (fond)            {nok(stats['market']):>14}   {pct(stats['weights']['dnb_global_indeks'] + stats['weights']['dnb_teknologi'])} av alt")
    print(f"    Forventet portefølje     {pct(stats['expected']):>14}/år")
    print(f"    Anslått svingning        {pct(stats['volatility']):>14}/år")
    print(f"    Svakt år                 {pct(stats['weak_year']):>14}")
    print(f"    Sterkt år                {pct(stats['strong_year']):>14}")
    extra_buffer = max(0, balances["buffer"] - TARGET_BUFFER)
    if first_month_pending:
        print(
            f"    Buffer-regel: tak {nok(TARGET_BUFFER)} etter første `close`. "
            f"Nå er {nok(extra_buffer)} over taket — første måned er unntak (fordel selv)."
        )
    elif extra_buffer > 0:
        print(f"    Buffer over taket: {nok(extra_buffer)} bør inn i fond ved neste `close`.")
    else:
        print(f"    Buffer-regel: tak {nok(TARGET_BUFFER)}. Overskudd øker buffer, deretter fond.")
    print()
    print("  Fond-modell (5 år, som på Nordnet)")
    print(
        f"    {GLOBAL_FUND.name}: {pct(GLOBAL_FUND.five_year_total)} totalt · "
        f"{pct(GLOBAL_FUND.expected_annual_return)} ann. · kostnad {pct(GLOBAL_FUND.annual_fee)} · "
        f"{GLOBAL_FUND.risk} · 1 år {pct(GLOBAL_FUND.recent_1y_return)}"
    )
    print(
        f"    {TECH_FUND.name}: {pct(TECH_FUND.five_year_total)} totalt · "
        f"{pct(TECH_FUND.expected_annual_return)} ann. · kostnad {pct(TECH_FUND.annual_fee)} · "
        f"{TECH_FUND.risk} · 1 år {pct(TECH_FUND.recent_1y_return)}"
    )
    print()
    print("  Forventet avkastning på dagens beholdning")
    print(f"    Denne måneden              {nok(month_gain):>14}")
    print(f"    Dette året                 {nok(month_gain * 12):>14}")
    print()
    print("  Månedlig plan")
    for name, amount in plan["income"].items():
        print(f"    + {name:<20} {nok(amount):>14}")
    for name, amount in plan["expenses"].items():
        print(f"    − {name:<20} {nok(amount):>14}")
    print(f"    − spareavtale global     {nok(plan['spareavtaler']['dnb_global_indeks']):>14}")
    print(f"    − spareavtale teknologi  {nok(plan['spareavtaler']['dnb_teknologi']):>14}")
    print(f"    {'Overskudd → buffer':<22} {nok(surplus):>14}")
    print(f"    {'Netto inn':<22} {nok(income):>14}")
    print(f"    {'Netto ut + sparing':<22} {nok(expenses + savings):>14}")
    print()
    print(f"  Verdi om {years} år (fond + spareavtaler, buffer uendret)")
    print(f"    {GLOBAL_FUND.name:<22} {nok(projected_global):>14}")
    print(f"    {TECH_FUND.name:<22} {nok(projected_tech):>14}")
    print(f"    {HOYRENTE.name:<22} {nok(projected_hoyrente):>14}   garantert bane")
    print(f"    {'Buffer':<22} {nok(balances['buffer']):>14}")
    print(f"    {'Forventet totalt':<22} {nok(projected_total):>14}")
    print(f"    {'Svakt (fond − svingning)':<22} {nok(weak_total):>14}")
    print(f"    {'Sterkt (fond + svingning)':<22} {nok(strong_total):>14}")
    print()
    print("  Mønster")
    print(f"    {analyze_trend(state['months'])}")
    if surplus >= 0:
        extra_g = round(surplus * 0.75 / 100) * 100
        extra_t = round(surplus * 0.25 / 100) * 100
        print(
            f"    Overskudd {nok(surplus)} → buffer først. "
            f"Over {nok(TARGET_BUFFER)} splittes {nok(extra_g)} / {nok(extra_t)} global/teknologi (3:1)."
        )
    print()
    closed = "allerede registrert" if month_already_closed(state) else "ikke registrert ennå"
    print(f"  {current_month_id()}: {closed}.  Historikk: {len(state['months'])} mnd.")
    print("  Test fordelinger: python3 main.py compare")
    print()


def print_compare(state: dict, extra_years: int | None = None) -> None:
    horizons = [1, 5, 10]
    if extra_years and extra_years not in horizons:
        horizons = sorted([*horizons, extra_years])

    plan_savings = state["plan"]["spareavtaler"]
    variants = strategies(state["balances"], plan_savings)
    baseline = project_path(
        variants[0].balances, variants[0].spareavtaler, 5, "expected"
    )["total"]

    print()
    print("  Porteføljevurdering ")
    print("  Høyrente: 4,85 % garantert. Svakt/sterkt = fond ± svingning hvert år (ytterpunkter, ikke sannsynlig 10-års bane).")
    print("  " + "─" * 64)

    ranked_expected: list[tuple[float, str]] = []
    ranked_weak: list[tuple[float, str]] = []

    for strategy in variants:
        stats = portfolio_stats(strategy.balances)
        ranked_expected.append(
            (
                project_path(strategy.balances, strategy.spareavtaler, 5, "expected")["total"],
                strategy.name,
            )
        )
        ranked_weak.append(
            (
                project_path(strategy.balances, strategy.spareavtaler, 5, "weak")["total"],
                strategy.name,
            )
        )

        print()
        print(f"  {strategy.name}  [{strategy.risk}]")
        print(f"    {strategy.why}")
        print(
            f"    Start: global {nok(strategy.balances['dnb_global_indeks'])}  "
            f"teknologi {nok(strategy.balances['dnb_teknologi'])}  "
            f"høyrente {nok(strategy.balances['hoyrente'])}  "
            f"buffer {nok(strategy.balances['buffer'])}"
        )
        print(
            f"    Spareavtale: {nok(strategy.spareavtaler['dnb_global_indeks'])}/mnd global · "
            f"{nok(strategy.spareavtaler['dnb_teknologi'])}/mnd teknologi"
        )
        print(
            f"    Nå: forventet {pct(stats['expected'])}/år · "
            f"svingning {pct(stats['volatility'])} · "
            f"fondskostnad {nok(stats['yearly_fee'])}/år · "
            f"svakt år {pct(stats['weak_year'])}"
        )
        print(f"    {'':6} {'forventet':>14} {'svakt':>14} {'sterkt':>14} {'vs nå 5år':>14}")
        for years in horizons:
            expected = project_path(strategy.balances, strategy.spareavtaler, years, "expected")
            weak = project_path(strategy.balances, strategy.spareavtaler, years, "weak")
            strong = project_path(strategy.balances, strategy.spareavtaler, years, "strong")
            delta = ""
            if years == 5:
                diff = expected["total"] - baseline
                if abs(diff) < 1:
                    delta = "—"
                else:
                    sign = "+" if diff >= 0 else "−"
                    delta = f"{sign}{nok(abs(diff))}"
            print(
                f"    {years:>2} år {nok(expected['total']):>14} {nok(weak['total']):>14} "
                f"{nok(strong['total']):>14} {delta:>14}"
            )
            if years == extra_years or (extra_years is None and years == 5):
                print(
                    f"           global {nok(expected['dnb_global_indeks'])} · "
                    f"teknologi {nok(expected['dnb_teknologi'])} · "
                    f"høyrente {nok(expected['hoyrente'])} · "
                    f"buffer {nok(expected['buffer'])}"
                )

    best_up = max(ranked_expected, key=lambda item: item[0])
    best_down = max(ranked_weak, key=lambda item: item[0])
    print()
    print("  Oppsummert etter 5 år")
    print(f"    Høyest forventet: {best_up[1]}  ({nok(best_up[0])})")
    print(f"    Best hvis fondene går svakt: {best_down[1]}  ({nok(best_down[0])})")
    print(
        "    Teknologi økes bare via høyere månedlig innsats — ingenting flyttes fra global indeks."
    )
    print()


def print_history(state: dict) -> None:
    months = state["months"]
    if not months:
        print("Ingen måneder registrert ennå. Kjør `python main.py close`.")
        return

    print()
    print("  MÅNEDSHISTORIKK")
    print("  " + "─" * 52)
    for entry in months:
        extra = ""
        if entry.get("first_month"):
            extra = "  (første mnd, buffer-tak pauset)"
        elif entry.get("buffer_overflow"):
            extra = f"  → fond {nok(entry['buffer_overflow'])}"
        print(
            f"    {entry['id']}   overskudd {nok(entry['surplus']):>10}   "
            f"sparing {nok(entry['saved_global'] + entry['saved_tech']):>10}   "
            f"buffer {nok(entry['balances_after']['buffer']):>12}{extra}"
        )
    avg = sum(entry["surplus"] for entry in months) / len(months)
    print()
    print(f"    Snitt overskudd: {nok(avg)} over {len(months)} mnd")
    print(f"    {analyze_trend(months)}")
    print()


def parse_amount(raw: str) -> float:
    cleaned = raw.replace(" ", "").replace("kr", "").replace(",", ".")
    return float(cleaned)


def is_year_count(value: str) -> bool:
    return value.isdigit() and int(value) >= 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Lokal sparekalkulator")
    sub = parser.add_subparsers(dest="command")
    sub.add_parser("close", help="Registrer denne måneden (spareavtaler + overskudd)")
    sub.add_parser("history", help="Vis tidligere måneder")
    sub.add_parser("compare", help="Test fordelinger: risiko vs avkastning")

    setter = sub.add_parser("set", help="Oppdater faktisk beholdning")
    setter.add_argument("name", choices=sorted(BALANCE_ALIASES))
    setter.add_argument("amount")

    plan = sub.add_parser("plan", help="Oppdater inntekt, utgift eller spareavtale")
    plan.add_argument("name", choices=sorted(PLAN_ALIASES))
    plan.add_argument("amount")
    return parser


def main() -> None:
    argv = sys.argv[1:]
    years = 5
    if argv and is_year_count(argv[0]):
        years = int(argv[0])
        argv = argv[1:]

    parser = build_parser()
    args = parser.parse_args(argv)
    state = load_state()

    if args.command is None:
        print_overview(state, years)
        return

    if args.command == "history":
        print_history(state)
        return

    if args.command == "compare":
        print_compare(state, extra_years=years)
        return

    if args.command == "close":
        entry = close_month(state)
        if entry.get("first_month"):
            print(
                f"Registrert {entry['id']}: overskudd {nok(entry['surplus'])} → buffer "
                f"{nok(entry['balances_after']['buffer'])}. "
                f"Første måned: buffer-tak {nok(TARGET_BUFFER)} er pauset."
            )
        elif entry.get("buffer_overflow"):
            print(
                f"Registrert {entry['id']}: overskudd {nok(entry['surplus'])}. "
                f"Buffer fylt til {nok(TARGET_BUFFER)}, "
                f"{nok(entry['buffer_overflow'])} inn i fond "
                f"({nok(entry['overflow_global'])} global / {nok(entry['overflow_tech'])} teknologi)."
            )
        else:
            print(
                f"Registrert {entry['id']}: overskudd {nok(entry['surplus'])} "
                f"→ buffer {nok(entry['balances_after']['buffer'])}."
            )
        print_overview(state, years)
        return

    if args.command == "set":
        key = BALANCE_ALIASES[args.name]
        amount = parse_amount(args.amount)
        set_balance(state, key, amount)
        print(f"Oppdatert {key} til {nok(amount)}.")
        return

    if args.command == "plan":
        group, key = PLAN_ALIASES[args.name]
        amount = parse_amount(args.amount)
        set_plan_item(state, group, key, amount)
        print(f"Oppdatert {group}.{key} til {nok(amount)}.")
        return


if __name__ == "__main__":
    main()
