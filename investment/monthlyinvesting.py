"""Månedlige inntekter og spareavtaler."""

INCOME = {
    "leieinntekt": 15500,
    "stipend": 4646,
}

SPAREAVTALER = {
    "dnb_global_indeks": 3000,
    "dnb_teknologi": 1000,
}

STARTING_BUFFER = 50000
# Etter første loggede måned: alt over dette går i fond (3:1 global/teknologi).
TARGET_BUFFER = 30000
OVERFLOW_TO_GLOBAL = 0.75


def total_income() -> float:
    return sum(INCOME.values())


def total_spareavtaler() -> float:
    return sum(SPAREAVTALER.values())
