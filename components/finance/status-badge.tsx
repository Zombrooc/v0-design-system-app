"use client"

import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "paid" | "pending" | "overdue" | "closed"
  className?: string
}

const statusConfig = {
  paid: {
    label: "Pago",
    classes: "bg-success-bg text-success-foreground",
  },
  pending: {
    label: "Pendente",
    classes: "bg-warning-bg text-warning-foreground",
  },
  overdue: {
    label: "Vencida",
    classes: "bg-destructive-bg text-destructive font-semibold",
  },
  closed: {
    label: "Fechada",
    classes: "bg-muted text-foreground-secondary",
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  )
}
