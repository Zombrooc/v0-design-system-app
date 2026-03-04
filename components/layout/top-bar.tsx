"use client"

import { cn } from "@/lib/utils"
import { Bell } from "lucide-react"

interface TopBarProps {
  title: string
  showGreeting?: boolean
  rightAction?: React.ReactNode
  className?: string
}

export function TopBar({ title, showGreeting, rightAction, className }: TopBarProps) {
  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[var(--z-sticky)] flex h-14 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-xl lg:left-[240px] lg:px-8",
        className
      )}
    >
      <h1 className="text-[15px] font-semibold leading-6 tracking-tight text-foreground">
        {title}
      </h1>
      {rightAction ?? (
        <button className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted">
          <Bell className="size-5 text-foreground-secondary" />
          <span className="sr-only">Notificacoes</span>
        </button>
      )}
    </header>
  )
}
