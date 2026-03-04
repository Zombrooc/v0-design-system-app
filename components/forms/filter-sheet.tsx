"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/mock-data"
import type { TransactionType } from "@/lib/mock-data"

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  activeType: TransactionType | "all"
  onTypeChange: (type: TransactionType | "all") => void
}

const typeFilters: { value: TransactionType | "all"; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "income", label: "Entrada" },
  { value: "expense", label: "Saida" },
  { value: "transfer", label: "Transferencia" },
]

function FilterForm({
  activeType,
  onTypeChange,
  onClose,
}: {
  activeType: TransactionType | "all"
  onTypeChange: (type: TransactionType | "all") => void
  onClose: () => void
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    )
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Type */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Tipo
        </Label>
        <div className="flex flex-wrap gap-2">
          {typeFilters.map((t) => (
            <button
              key={t.value}
              onClick={() => onTypeChange(t.value)}
              data-active={activeType === t.value}
              className={cn(
                "rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted",
                "data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Date range */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Periodo
        </Label>
        <div className="flex gap-2">
          <Input
            type="date"
            className="h-11 flex-1 rounded-[var(--radius-input)] border-transparent bg-muted focus-visible:border-primary focus-visible:bg-surface"
          />
          <Input
            type="date"
            className="h-11 flex-1 rounded-[var(--radius-input)] border-transparent bg-muted focus-visible:border-primary focus-visible:bg-surface"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Categorias
        </Label>
        <div className="flex flex-wrap gap-2">
          {categories.filter((c) => c.id !== "transfer").map((cat) => (
            <button
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              data-active={selectedCategories.includes(cat.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground-secondary transition-colors hover:bg-muted",
                "data-[active=true]:border-primary data-[active=true]:bg-primary data-[active=true]:text-primary-foreground"
              )}
            >
              <cat.icon className="size-3.5" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Value range */}
      <div className="flex flex-col gap-2">
        <Label className="text-xs font-medium uppercase tracking-wide text-foreground-secondary">
          Valor
        </Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            className="h-11 flex-1 rounded-[var(--radius-input)] border-transparent bg-muted focus-visible:border-primary focus-visible:bg-surface"
          />
          <Input
            type="number"
            placeholder="Max"
            className="h-11 flex-1 rounded-[var(--radius-input)] border-transparent bg-muted focus-visible:border-primary focus-visible:bg-surface"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3 pt-2">
        <Button
          variant="ghost"
          className="flex-1 rounded-full"
          onClick={() => {
            setSelectedCategories([])
            onTypeChange("all")
          }}
        >
          Limpar
        </Button>
        <Button className="flex-1 rounded-full" onClick={onClose}>
          Aplicar
        </Button>
      </div>
    </div>
  )
}

export function FilterSheet({ open, onOpenChange, activeType, onTypeChange }: FilterSheetProps) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92dvh]">
          <DrawerHeader>
            <DrawerTitle>Filtros</DrawerTitle>
            <DrawerDescription>Filtre suas transacoes.</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-4">
            <FilterForm
              activeType={activeType}
              onTypeChange={onTypeChange}
              onClose={() => onOpenChange(false)}
            />
          </div>
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:max-w-[400px]">
        <SheetHeader>
          <SheetTitle>Filtros</SheetTitle>
          <SheetDescription>Filtre suas transacoes.</SheetDescription>
        </SheetHeader>
        <div className="overflow-y-auto px-4 pb-4">
          <FilterForm
            activeType={activeType}
            onTypeChange={onTypeChange}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
