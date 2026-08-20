"""Høyrente med 6 måneders binding."""

from dataclasses import dataclass
from datetime import date


@dataclass(frozen=True)
class HighYieldAccount:
    name: str
    starting_balance: float
    annual_rate: float
    lock_months: int
    lock_start: date
    guaranteed: bool = True


ACCOUNT = HighYieldAccount(
    name="Høyrente",
    starting_balance=50000,
    annual_rate=0.0485,
    lock_months=6,
    lock_start=date(2026, 8, 1),
    guaranteed=True,
)
