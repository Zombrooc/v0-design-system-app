"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/format-currency"
import { getCategoryById, type Transaction } from "@/lib/mock-data"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface TransactionRowProps {
  transaction: Transaction
  className?: string
}

export function TransactionRow({ transaction, className }: TransactionRowProps) {
  const category = getCategoryById(transaction.categoryId)
  const CategoryIcon = category.icon

  const amountColor =
    transaction.type === "income"
      ? "text-success"
      : transaction.type === "transfer"
        ? "text-foreground-secondary"
        : "text-foreground"

  const prefix = transaction.type === "income" ? "+" : transaction.type === "transfer" ? "" : "-"

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-surface-overlay cursor-pointer",
        className
      )}
    >
      <div
        className="flex size-9 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-muted"
        style={{ color: category.color }}
      >
        <CategoryIcon className="size-[18px]" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-base font-medium text-foreground">
          {transaction.description}
        </span>
        <span className="text-sm text-foreground-tertiary">
          {category.name} · {format(new Date(transaction.date), "dd MMM", { locale: ptBR })}
        </span>
      </div>

      <span className={cn("shrink-0 text-base font-semibold tabular-nums", amountColor)}>
        {prefix}{formatCurrency(transaction.amount)}
      </span>
    </div>
  )
}
