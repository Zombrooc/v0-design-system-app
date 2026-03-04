"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ArrowLeftRight, Receipt, User } from "lucide-react"
import { motion } from "framer-motion"

const tabs = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/transactions", label: "Transacoes", icon: ArrowLeftRight },
  { href: "#", label: "Faturas", icon: Receipt },
  { href: "#", label: "Perfil", icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-[var(--z-sticky)] flex h-[var(--bottom-nav-height)] items-center justify-around border-t border-border bg-surface/90 backdrop-blur-xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="navigation"
      aria-label="Navegacao principal"
    >
      {tabs.map((tab) => {
        const isActive = tab.href === "/dashboard"
          ? pathname === "/dashboard"
          : pathname.startsWith(tab.href) && tab.href !== "#"

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="relative flex flex-col items-center gap-0.5 px-3 py-2"
          >
            <tab.icon
              className={cn(
                "size-[22px] transition-colors duration-150",
                isActive ? "text-primary" : "text-foreground-tertiary"
              )}
            />
            <span
              className={cn(
                "text-[11px] font-medium leading-4 transition-colors duration-150",
                isActive ? "text-primary" : "text-foreground-tertiary"
              )}
            >
              {tab.label}
            </span>
            {isActive && (
              <motion.div
                layoutId="bottomNavIndicator"
                className="absolute -bottom-0.5 h-0.5 w-8 rounded-full bg-primary"
                transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              />
            )}
          </Link>
        )
      })}
    </nav>
  )
}
