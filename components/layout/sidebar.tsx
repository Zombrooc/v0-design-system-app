"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  ArrowLeftRight,
  Wallet,
  CreditCard,
  Receipt,
  TrendingUp,
  BarChart3,
  Users,
  Settings,
} from "lucide-react"
import { user } from "@/lib/mock-data"

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/transactions", label: "Transacoes", icon: ArrowLeftRight },
  { href: "#", label: "Carteiras", icon: Wallet },
  { href: "#", label: "Cartoes", icon: CreditCard },
  { href: "#", label: "Faturas", icon: Receipt },
  { href: "#", label: "Projecao", icon: TrendingUp },
  { href: "#", label: "Estatisticas", icon: BarChart3 },
  { href: "#", label: "Organizacoes", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-[var(--z-sticky)] hidden w-[240px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground lg:flex">
      {/* Logo */}
      <div className="flex items-center px-5 py-4">
        <span className="text-lg font-semibold text-primary-foreground">Finz</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2" role="navigation" aria-label="Menu principal">
        {navItems.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href) && item.href !== "#"

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground/60 hover:bg-sidebar-muted hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* User */}
      <div className="flex items-center gap-3 border-t border-sidebar-border px-4 py-3">
        <div className="flex size-8 items-center justify-center rounded-full bg-sidebar-muted text-xs font-semibold text-sidebar-foreground">
          {user.name[0]}
        </div>
        <div className="flex flex-1 flex-col">
          <span className="text-sm font-medium text-sidebar-foreground">{user.fullName}</span>
        </div>
        <button className="flex size-8 items-center justify-center rounded-full text-sidebar-foreground/40 transition-colors hover:bg-sidebar-muted hover:text-sidebar-foreground">
          <Settings className="size-4" />
          <span className="sr-only">Configuracoes</span>
        </button>
      </div>
    </aside>
  )
}
