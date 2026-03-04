"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"
import { TopBar } from "@/components/layout/top-bar"
import { FAB } from "@/components/layout/fab"
import { BalanceHero } from "@/components/finance/balance-hero"
import { StatCard } from "@/components/finance/stat-card"
import { CreditCardDisplay } from "@/components/finance/credit-card-display"
import { TransactionRow } from "@/components/finance/transaction-row"
import { BillRow } from "@/components/finance/bill-row"
import { TransactionSheet } from "@/components/forms/transaction-sheet"
import {
  user,
  creditCards,
  getTotalBalance,
  getMonthlyIncome,
  getMonthlyExpenses,
  getRecentTransactions,
  getUpcomingBills,
} from "@/lib/mock-data"
import { formatCurrency } from "@/lib/format-currency"

const now = new Date()
const month = now.getMonth()
const year = now.getFullYear()

export default function DashboardPage() {
  const [sheetOpen, setSheetOpen] = useState(false)

  const totalBalance = getTotalBalance()
  const monthlyIncome = getMonthlyIncome(month, year)
  const monthlyExpenses = getMonthlyExpenses(month, year)
  const recentTransactions = getRecentTransactions(5)
  const upcomingBills = getUpcomingBills(3)

  const pendingBillsTotal = upcomingBills.reduce((s, b) => s + b.amount, 0)

  return (
    <>
      <TopBar title={`Ola, ${user.name}`} />

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-[800px] px-4 py-6 lg:px-8"
      >
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex flex-col gap-8">
          {/* Section 1 - Balance Hero */}
          <motion.div variants={staggerItem}>
            <BalanceHero
              totalBalance={totalBalance}
              monthlyIncome={monthlyIncome}
              monthlyExpenses={monthlyExpenses}
              trendText={`+${formatCurrency(monthlyIncome - monthlyExpenses)} este mes`}
            />
          </motion.div>

          {/* Section 2 - Quick Stats */}
          <motion.div variants={staggerItem}>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <StatCard
                label="Saldo"
                value={totalBalance}
                trend="up"
                trendValue="+3.2%"
              />
              <StatCard
                label="A pagar"
                value={pendingBillsTotal}
                trend="neutral"
                trendValue="3 contas"
              />
              <StatCard
                label="Receitas"
                value={monthlyIncome}
                trend="up"
                trendValue="+12%"
              />
              <StatCard
                label="Prox. fatura"
                value={creditCards[0].used}
                trend="down"
                trendValue={`dia ${creditCards[0].dueDay}`}
              />
            </div>
          </motion.div>

          {/* Section 3 - Credit Cards */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-foreground">Meus Cartoes</h2>
              <button className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground">
                Ver todos
              </button>
            </div>
            <div className="mt-3 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" style={{ scrollSnapType: "x mandatory" }}>
              {creditCards.map((card) => (
                <div key={card.id} style={{ scrollSnapAlign: "start" }}>
                  <CreditCardDisplay card={card} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 4 - Recent Transactions */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-foreground">Transacoes recentes</h2>
              <Link
                href="/dashboard/transactions"
                className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground"
              >
                Ver tudo
              </Link>
            </div>
            <div className="mt-2 overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-[var(--shadow-xs)]">
              {recentTransactions.map((t, i) => (
                <div key={t.id}>
                  <TransactionRow transaction={t} />
                  {i < recentTransactions.length - 1 && (
                    <div className="mx-4 border-b border-border/50" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 5 - Upcoming Bills */}
          <motion.div variants={staggerItem}>
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold text-foreground">Proximas contas</h2>
              <button className="rounded-full px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted hover:text-foreground">
                Ver tudo
              </button>
            </div>
            <div className="mt-2 overflow-hidden rounded-[var(--radius)] border border-border bg-surface shadow-[var(--shadow-xs)]">
              {upcomingBills.map((b, i) => (
                <div key={b.id}>
                  <BillRow bill={b} />
                  {i < upcomingBills.length - 1 && (
                    <div className="mx-4 border-b border-border/50" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* FAB */}
      <FAB
        onAdd={() => setSheetOpen(true)}
        className="bottom-[calc(var(--bottom-nav-height)+16px)] right-4 lg:bottom-8 lg:right-8"
      />

      <TransactionSheet open={sheetOpen} onOpenChange={setSheetOpen} />
    </>
  )
}
