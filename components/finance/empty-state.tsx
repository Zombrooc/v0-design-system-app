"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  headline: string
  description: string
  ctaLabel?: string
  onCta?: () => void
  className?: string
}

export function EmptyState({ icon: Icon, headline, description, ctaLabel, onCta, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 px-6 py-16 text-center", className)}>
      <Icon className="size-12 text-foreground-tertiary/40" />
      <h3 className="font-editorial text-xl text-foreground">{headline}</h3>
      <p className="max-w-[240px] text-sm text-foreground-tertiary">{description}</p>
      {ctaLabel && onCta && (
        <Button onClick={onCta} className="mt-2 rounded-full">
          {ctaLabel}
        </Button>
      )}
    </div>
  )
}
