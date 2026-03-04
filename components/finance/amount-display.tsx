"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/format-currency"
import type { TransactionType } from "@/lib/mock-data"

interface AmountDisplayProps {
  value: number
  type?: TransactionType
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  xs: "text-sm",
  sm: "text-base font-medium",
  md: "text-lg font-semibold",
  lg: "text-3xl font-semibold font-editorial",
}

export function AmountDisplay({ value, type = "expense", size = "sm", className }: AmountDisplayProps) {
  const prefix = type === "income" ? "+" : type === "transfer" ? "" : ""
  const colorClass =
    type === "income"
      ? "text-success"
      : type === "transfer"
        ? "text-foreground-secondary"
        : "text-foreground"

  return (
    <span
      className={cn(
        "tabular-nums tracking-tight",
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {prefix}{formatCurrency(value)}
    </span>
  )
}
