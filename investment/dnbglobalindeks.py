"""DNB Global Indeks — modell fra 5-års utvikling (Nordnet)."""

from dataclasses import dataclass


@dataclass(frozen=True)
class FundModel:
    id: str
    name: str
    expected_annual_return: float  # 5-års annualisert, etter kostnader
    recent_1y_return: float
    five_year_total: float
    annual_fee: float
    risk: str
    region: str
    morningstar: int
    starting_balance: float
    annual_volatility: float  # anslått årlig svingning (ikke garanti)


FUND = FundModel(
    id="dnb_global_indeks",
    name="DNB Global Indeks",
    expected_annual_return=0.1302,
    recent_1y_return=0.1248,
    five_year_total=0.8441,
    annual_fee=0.0020,
    risk="Middels",
    region="USA",
    morningstar=4,
    starting_balance=200000,
    annual_volatility=0.14,
)