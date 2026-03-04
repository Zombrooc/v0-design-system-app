"use client"

import { Sidebar } from "./sidebar"
import { BottomNav } from "./bottom-nav"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background">
      <Sidebar />
      <main className="min-h-dvh pb-[var(--bottom-nav-height)] pt-14 lg:pb-0 lg:pl-[240px]">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
