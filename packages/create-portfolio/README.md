# create-birk-portfolio

Interaktiv CLI for å sette opp en Next.js-portefølje.

## Viktig: `pnpm create portfolio` er en annen pakke

`pnpm create portfolio` laster ned **`create-portfolio` fra npm** — det er **ikke** denne CLI-en.

Denne pakken heter **`create-birk-portfolio`**.

## Kjør fra hvor som helst (anbefalt)

Installer globalt én gang:

```bash
cd Portfolio
pnpm create-portfolio:link
```

Deretter, fra **hvilken som helst mappe**:

```bash
create-portfolio
# eller
create-birk-portfolio

# valgfritt: gi mappenavn direkte
create-portfolio min-portfolio
```

## Kjør uten global install

Fra repo root:

```bash
pnpm create-portfolio
```

Eller med `pnpm dlx` + lokal sti:

```bash
pnpm dlx /full/sti/til/Portfolio/packages/create-portfolio
```

## Når publisert til npm

```bash
pnpm create birk-portfolio
# eller
pnpm dlx create-birk-portfolio
```

## Wizard spør om

- Prosjektmappe
- Navn + sidetittel
- Domene
- GitHub + e-post
- Fargetema (slate, warm, ocean, forest)
- Cursor rules + Husky
- `pnpm install` + `git init`

## Utvikling

```bash
pnpm template:sync
pnpm create-portfolio:build
pnpm --filter create-birk-portfolio full-test
```
