"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/format-currency"
import { getCategoryById, type Bill } from "@/lib/mock-data"
import { StatusBadge } from "./status-badge"
import { format, differenceInDays } from "date-fns"
import { ptBR } from "date-fns/locale"

interface BillRowProps {
  bill: Bill
  className?: string
}

export function BillRow({ bill, className }: BillRowProps) {
  const category = getCategoryById(bill.categoryId)
  const CategoryIcon = category.icon
  const dueDate = new Date(bill.dueDate)
  const daysUntilDue = differenceInDays(dueDate, new Date())

  const dueDateColor =
    bill.status === "paid"
      ? "text-foreground-tertiary"
      : daysUntilDue < 0
        ? "text-destructive font-semibold"
        : daysUntilDue <= 3
          ? "text-destructive font-medium"
          : daysUntilDue <= 7
            ? "text-warning-foreground"
            : "text-foreground-tertiary"

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
          {bill.name}
        </span>
        <span className={cn("text-sm", dueDateColor)}>
          {format(dueDate, "dd MMM", { locale: ptBR })}
          {daysUntilDue >= 0 && bill.status !== "paid" && ` · em ${daysUntilDue} dias`}
          {daysUntilDue < 0 && bill.status !== "paid" && " · vencida"}
        </span>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span className="text-base font-semibold tabular-nums text-foreground">
          {formatCurrency(bill.amount)}
        </span>
        <StatusBadge status={bill.status} />
      </div>
    </div>
  )
}
