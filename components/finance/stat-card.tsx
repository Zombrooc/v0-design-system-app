"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { formatCurrency } from "@/lib/format-currency"

interface StatCardProps {
  label: string
  value: number
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  className?: string
}

export function StatCard({ label, value, trend, trendValue, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-[var(--radius)] border border-border bg-surface p-5 shadow-[var(--shadow-xs)]",
        className
      )}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
        {label}
      </span>
      <span className="text-2xl font-semibold tabular-nums text-foreground">
        {formatCurrency(value)}
      </span>
      {trend && trendValue && (
        <span
          className={cn(
            "flex items-center gap-1 text-sm",
            trend === "up" && "text-success",
            trend === "down" && "text-destructive",
            trend === "neutral" && "text-foreground-tertiary"
          )}
        >
          {trend === "up" && <TrendingUp className="size-3.5" />}
          {trend === "down" && <TrendingDown className="size-3.5" />}
          {trend === "neutral" && <Minus className="size-3.5" />}
          {trendValue}
        </span>
      )}
    </div>
  )
}
