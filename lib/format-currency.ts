const formatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number): string {
  return formatter.format(value)
}

export function formatCompactCurrency(value: number): string {
  if (Math.abs(value) >= 1000) {
    const compact = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      notation: "compact",
      maximumFractionDigits: 1,
    })
    return compact.format(value)
  }
  return formatter.format(value)
}
