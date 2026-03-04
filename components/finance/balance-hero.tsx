"use client"

import { cn } from "@/lib/utils"
import { formatCurrency } from "@/lib/format-currency"
import { TrendingUp } from "lucide-react"

interface BalanceHeroProps {
  totalBalance: number
  monthlyIncome: number
  monthlyExpenses: number
  trendText?: string
  className?: string
}

export function BalanceHero({
  totalBalance,
  monthlyIncome,
  monthlyExpenses,
  trendText = "+R$ 320 este mes",
  className,
}: BalanceHeroProps) {
  return (
    <div
      className={cn(
        "rounded-[20px] bg-foreground p-6 text-primary-foreground shadow-[var(--shadow-md)]",
        className
      )}
    >
      <span className="text-xs font-medium uppercase tracking-wide text-primary-foreground/60">
        Saldo total
      </span>
      <div className="mt-1 flex items-baseline gap-3">
        <span className="font-editorial text-4xl tabular-nums tracking-tight text-primary-foreground">
          {formatCurrency(totalBalance)}
        </span>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <span className="flex items-center gap-1 rounded-full bg-primary-foreground/10 px-2 py-0.5 text-xs text-primary-foreground/80">
          <TrendingUp className="size-3" />
          {trendText}
        </span>
      </div>
      <div className="mt-4 flex gap-6">
        <div className="flex flex-col">
          <span className="text-xs text-primary-foreground/50">Receitas</span>
          <span className="text-sm font-medium tabular-nums text-success">
            +{formatCurrency(monthlyIncome)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-primary-foreground/50">Despesas</span>
          <span className="text-sm font-medium tabular-nums text-[hsl(4_86%_65%)]">
            -{formatCurrency(monthlyExpenses)}
          </span>
        </div>
      </div>
    </div>
  )
}
