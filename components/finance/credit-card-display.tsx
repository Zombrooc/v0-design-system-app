"use client"

import { cn } from "@/lib/utils"
import type { CreditCard } from "@/lib/mock-data"

interface CreditCardDisplayProps {
  card: CreditCard
  className?: string
}

const colorThemes = {
  navy: "from-[hsl(220_50%_20%)] to-[hsl(220_50%_12%)]",
  midnight: "from-[hsl(240_20%_16%)] to-[hsl(240_20%_8%)]",
  forest: "from-[hsl(160_30%_18%)] to-[hsl(160_30%_10%)]",
  slate: "from-[hsl(215_20%_28%)] to-[hsl(215_20%_16%)]",
}

const brandLogos: Record<string, string> = {
  visa: "VISA",
  mastercard: "MC",
  elo: "ELO",
}

export function CreditCardDisplay({ card, className }: CreditCardDisplayProps) {
  const usagePercent = Math.round((card.used / card.limit) * 100)

  return (
    <div
      className={cn(
        "relative flex aspect-[1.586/1] w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-[20px] bg-gradient-to-br p-5 text-primary-foreground shadow-[var(--shadow-md)]",
        colorThemes[card.colorTheme],
        className
      )}
    >
      {/* Noise texture overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      <div className="flex items-start justify-between">
        <span className="text-lg font-bold tracking-wider opacity-90">
          {brandLogos[card.brand]}
        </span>
        <span className="text-sm opacity-70">{card.name}</span>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-lg tracking-[0.2em] opacity-90">
          {"•••• •••• •••• "}{card.last4}
        </span>
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider opacity-50">Utilizado</span>
            <span className="text-sm font-semibold tabular-nums">{usagePercent}%</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider opacity-50">Vencimento</span>
            <span className="text-sm tabular-nums opacity-80">dia {card.dueDay}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
