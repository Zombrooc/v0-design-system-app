"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { pageVariants, staggerContainer, staggerItem } from "@/lib/motion"
import { TopBar } from "@/components/layout/top-bar"
import { FAB } from "@/components/layout/fab"
import { TransactionRow } from "@/components/finance/transaction-row"
import { TransactionSheet } from "@/components/forms/transaction-sheet"
import { FilterSheet } from "@/components/forms/filter-sheet"
import { formatCurrency } from "@/lib/format-currency"
import { transactions, getTransactionsByDate } from "@/lib/mock-data"
import type { TransactionType } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const typeFilters: { value: TransactionType | "all"; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "income", label: "Entrada" },
  { value: "expense", label: "Saida" },
  { value: "transfer", label: "Transferencia" },
]

export default function TransactionsPage() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeType, setActiveType] = useState<TransactionType | "all">("all")

  const filtered = useMemo(() => {
    if (activeType === "all") return transactions
    return transactions.filter((t) => t.type === activeType)
  }, [activeType])

  const grouped = useMemo(() => {
    const sorted = [...filtered].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    const groups: Record<string, typeof filtered> = {}
    for (const t of sorted) {
      if (!groups[t.date]) groups[t.date] = []
      groups[t.date].push(t)
    }
    return groups
  }, [filtered])

  const totalIncome = filtered.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0)
  const totalExpense = filtered.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0)
  const periodBalance = totalIncome - totalExpense

  return (
    <>
      <TopBar
        title="Transacoes"
        rightAction={
          <button
            onClick={() => setFilterOpen(true)}
            className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-muted"
          >
            <SlidersHorizontal className="size-5 text-foreground-secondary" />
            <span className="sr-only">Filtros</span>
          </button>
        }
      />

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="mx-auto max-w-[800px]"
      >
        {/* Filter bar */}
        <div className="sticky top-14 z-[var(--z-raised)] flex h-12 items-center gap-2 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
          {typeFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveType(f.value)}
              data-active={activeType === f.value}
              className={cn(
                "rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted",
                "data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Summary strip */}
        <div className="mx-4 mt-3 flex gap-0 rounded-[var(--radius)] bg-muted p-3 lg:mx-8">
          <div className="flex flex-1 flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">Entradas</span>
            <span className="text-sm font-semibold tabular-nums text-success">{formatCurrency(totalIncome)}</span>
          </div>
          <div className="w-px bg-border" />
          <div className="flex flex-1 flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">Saidas</span>
            <span className="text-sm font-semibold tabular-nums text-destructive">{formatCurrency(totalExpense)}</span>
          </div>
          <div className="w-px bg-border" />
          <div className="flex flex-1 flex-col items-center">
            <span className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">Saldo</span>
            <span className={cn("text-sm font-semibold tabular-nums", periodBalance >= 0 ? "text-success" : "text-destructive")}>
              {formatCurrency(periodBalance)}
            </span>
          </div>
        </div>

        {/* Transaction list */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col pb-8"
        >
          {Object.entries(grouped).map(([date, txs]) => (
            <motion.div key={date} variants={staggerItem}>
              {/* Date divider */}
              <div className="sticky top-[calc(3.5rem+3rem)] z-[var(--z-raised)] bg-background/90 px-4 py-2 backdrop-blur lg:px-8">
                <span className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
                  {format(new Date(date), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </span>
              </div>
              <div className="overflow-hidden border-b border-border/50">
                {txs.map((t, i) => (
                  <div key={t.id}>
                    <TransactionRow transaction={t} />
                    {i < txs.length - 1 && <div className="mx-4 border-b border-border/50" />}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* FAB */}
      <FAB
        onAdd={() => setSheetOpen(true)}
        className="bottom-[calc(var(--bottom-nav-height)+16px)] right-4 lg:bottom-8 lg:right-8"
      />

      <TransactionSheet open={sheetOpen} onOpenChange={setSheetOpen} />
      <FilterSheet
        open={filterOpen}
        onOpenChange={setFilterOpen}
        activeType={activeType}
        onTypeChange={setActiveType}
      />
    </>
  )
}
