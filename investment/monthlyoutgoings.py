"""Faste månedlige utgifter."""

EXPENSES = {
    "leie": 8250,
    "mat": 3000,
    "kollektiv_og_strom": 500,
}


def total_expenses() -> float:
    return sum(EXPENSES.values())
