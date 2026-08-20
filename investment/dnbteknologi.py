"""DNB Teknologi A — modell fra 5-års utvikling (Nordnet)."""

from dnbglobalindeks import FundModel

FUND = FundModel(
    id="dnb_teknologi",
    name="DNB Teknologi A",
    expected_annual_return=0.2085,
    recent_1y_return=0.2997,
    five_year_total=1.5781,
    annual_fee=0.0115,
    risk="Middels",
    region="USA",
    morningstar=4,
    starting_balance=30000,
    annual_volatility=0.22,
)
