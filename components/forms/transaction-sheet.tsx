"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { categories, wallets } from "@/lib/mock-data"
import type { TransactionType } from "@/lib/mock-data"

interface TransactionSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const transactionTypes: { value: TransactionType; label: string }[] = [
  { value: "income", label: "Entrada" },
  { value: "expense", label: "Saida" },
  { value: "transfer", label: "Transferencia" },
]

function TransactionForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<TransactionType>("expense")

  return (
    <div className="flex flex-col gap-4">
      {/* Type selector */}
      <div className="flex rounded-full border border-border bg-muted p-1">
        {transactionTypes.map((t) => (
          <button
            key={t.value}
            onClick={() => setType(t.value)}
            className={cn(
              "flex-1 rounded-full px-3 py-2 text-sm font-medium transition-all duration-150",
              type === t.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground-secondary hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Amount */}
      <div className="flex flex-col items-center gap-1 py-4">
        <span className="text-sm text-foreground-secondary">R$</span>
        <Input
          type="number"
          placeholder="0,00"
          className="h-auto border-0 bg-transparent text-center text-3xl font-semibold tabular-nums text-foreground shadow-none focus-visible:ring-0"
          autoFocus
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Descricao
        </Label>
        <Input
          placeholder="Ex.: Mercado, Salario..."
          className="h-11 rounded-[var(--radius-input)] border-transparent bg-muted focus-visible:border-primary focus-visible:bg-surface"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Categoria
        </Label>
        <div className="flex flex-wrap gap-2">
          {categories
            .filter((c) => (type === "income" ? ["salary", "freelance"].includes(c.id) : c.id !== "transfer"))
            .slice(0, 8)
            .map((cat) => (
              <button
                key={cat.id}
                className="flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              >
                <cat.icon className="size-3.5" style={{ color: cat.color }} />
                {cat.name}
              </button>
            ))}
        </div>
      </div>

      {/* Wallet */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Conta
        </Label>
        <div className="flex flex-wrap gap-2">
          {wallets.map((w) => (
            <button
              key={w.id}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted"
            >
              {w.name}
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Data
        </Label>
        <Input
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className="h-11 rounded-[var(--radius-input)] border-transparent bg-muted focus-visible:border-primary focus-visible:bg-surface"
        />
      </div>

      {/* Footer */}
      <div className="flex gap-3 pt-2">
        <Button variant="ghost" className="flex-1 rounded-full" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="flex-1 rounded-full" onClick={onClose}>
          Salvar
        </Button>
      </div>
    </div>
  )
}

export function TransactionSheet({ open, onOpenChange }: TransactionSheetProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92dvh]">
          <DrawerHeader>
            <DrawerTitle>Nova transacao</DrawerTitle>
            <DrawerDescription>Adicione uma nova transacao.</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-4">
            <TransactionForm onClose={() => onOpenChange(false)} />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[420px] sm:max-w-[420px]">
        <SheetHeader>
          <SheetTitle>Nova transacao</SheetTitle>
          <SheetDescription>Adicione uma nova transacao.</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-4 pb-4">
          <TransactionForm onClose={() => onOpenChange(false)} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
