import {
  Home,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  ShoppingCart,
  Utensils,
  Car,
  Briefcase,
  Heart,
  Gamepad2,
  GraduationCap,
  Zap,
  Smartphone,
  Gift,
  Banknote,
  type LucideIcon,
} from "lucide-react"

// ── Types ──

export type TransactionType = "income" | "expense" | "transfer"

export interface Category {
  id: string
  name: string
  icon: LucideIcon
  color: string
}

export interface Wallet {
  id: string
  name: string
  balance: number
  icon: string
  type: "checking" | "savings" | "investment" | "cash"
}

export interface CreditCard {
  id: string
  name: string
  last4: string
  brand: "visa" | "mastercard" | "elo"
  colorTheme: "navy" | "midnight" | "forest" | "slate"
  limit: number
  used: number
  dueDay: number
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  description: string
  categoryId: string
  date: string
  walletId: string
}

export type BillStatus = "paid" | "pending" | "overdue" | "closed"

export interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string
  status: BillStatus
  categoryId: string
}

// ── Categories ──

export const categories: Category[] = [
  { id: "salary", name: "Salario", icon: Banknote, color: "hsl(var(--success))" },
  { id: "food", name: "Alimentacao", icon: Utensils, color: "hsl(36 95% 48%)" },
  { id: "transport", name: "Transporte", icon: Car, color: "hsl(206 92% 50%)" },
  { id: "shopping", name: "Compras", icon: ShoppingCart, color: "hsl(280 70% 50%)" },
  { id: "health", name: "Saude", icon: Heart, color: "hsl(4 86% 55%)" },
  { id: "education", name: "Educacao", icon: GraduationCap, color: "hsl(221 98% 55%)" },
  { id: "entertainment", name: "Lazer", icon: Gamepad2, color: "hsl(310 70% 50%)" },
  { id: "bills", name: "Contas", icon: Zap, color: "hsl(36 95% 48%)" },
  { id: "tech", name: "Tecnologia", icon: Smartphone, color: "hsl(240 15% 30%)" },
  { id: "gifts", name: "Presentes", icon: Gift, color: "hsl(340 80% 55%)" },
  { id: "freelance", name: "Freelance", icon: Briefcase, color: "hsl(152 69% 31%)" },
  { id: "home", name: "Moradia", icon: Home, color: "hsl(220 9% 46%)" },
  { id: "transfer", name: "Transferencia", icon: ArrowLeftRight, color: "hsl(var(--foreground-secondary))" },
]

export function getCategoryById(id: string): Category {
  return categories.find((c) => c.id === id) ?? categories[0]
}

// ── User ──

export const user = {
  name: "Lucas",
  fullName: "Lucas Oliveira",
  avatarUrl: "/placeholder.svg?height=40&width=40",
}

// ── Wallets ──

export const wallets: Wallet[] = [
  { id: "w1", name: "Nubank", balance: 8420.5, icon: "bank", type: "checking" },
  { id: "w2", name: "Itau", balance: 3200.0, icon: "bank", type: "checking" },
  { id: "w3", name: "Poupanca", balance: 15000.0, icon: "piggy-bank", type: "savings" },
  { id: "w4", name: "Carteira", balance: 320.0, icon: "wallet", type: "cash" },
]

// ── Credit Cards ──

export const creditCards: CreditCard[] = [
  { id: "cc1", name: "Nubank Platinum", last4: "4321", brand: "mastercard", colorTheme: "midnight", limit: 12000, used: 3450.8, dueDay: 15 },
  { id: "cc2", name: "Itau Black", last4: "8765", brand: "visa", colorTheme: "navy", limit: 20000, used: 7800.0, dueDay: 10 },
  { id: "cc3", name: "Inter Gold", last4: "2109", brand: "elo", colorTheme: "forest", limit: 8000, used: 1230.5, dueDay: 20 },
]

// ── Transactions ──

export const transactions: Transaction[] = [
  { id: "t1", type: "income", amount: 8500, description: "Salario", categoryId: "salary", date: "2026-03-01", walletId: "w1" },
  { id: "t2", type: "expense", amount: 420.5, description: "Supermercado Extra", categoryId: "food", date: "2026-03-02", walletId: "w1" },
  { id: "t3", type: "expense", amount: 89.9, description: "Uber / 99", categoryId: "transport", date: "2026-03-02", walletId: "w1" },
  { id: "t4", type: "expense", amount: 199.0, description: "Amazon - Fone Bluetooth", categoryId: "shopping", date: "2026-03-03", walletId: "w1" },
  { id: "t5", type: "income", amount: 2400, description: "Projeto freelance", categoryId: "freelance", date: "2026-03-03", walletId: "w2" },
  { id: "t6", type: "expense", amount: 65.0, description: "Farmacia", categoryId: "health", date: "2026-03-03", walletId: "w4" },
  { id: "t7", type: "transfer", amount: 1000, description: "Nubank -> Poupanca", categoryId: "transfer", date: "2026-03-04", walletId: "w1" },
  { id: "t8", type: "expense", amount: 1850.0, description: "Aluguel", categoryId: "home", date: "2026-03-01", walletId: "w2" },
  { id: "t9", type: "expense", amount: 320.0, description: "Curso online", categoryId: "education", date: "2026-02-28", walletId: "w1" },
  { id: "t10", type: "expense", amount: 55.9, description: "Netflix + Spotify", categoryId: "entertainment", date: "2026-02-28", walletId: "w1" },
  { id: "t11", type: "expense", amount: 280.0, description: "Conta de luz", categoryId: "bills", date: "2026-02-27", walletId: "w2" },
  { id: "t12", type: "income", amount: 350.0, description: "Venda Mercado Livre", categoryId: "freelance", date: "2026-02-27", walletId: "w1" },
  { id: "t13", type: "expense", amount: 158.0, description: "Restaurante japones", categoryId: "food", date: "2026-02-26", walletId: "w1" },
  { id: "t14", type: "expense", amount: 79.9, description: "Gasolina", categoryId: "transport", date: "2026-02-26", walletId: "w4" },
  { id: "t15", type: "transfer", amount: 500, description: "Itau -> Nubank", categoryId: "transfer", date: "2026-02-25", walletId: "w2" },
  { id: "t16", type: "expense", amount: 45.0, description: "Presente aniversario", categoryId: "gifts", date: "2026-02-25", walletId: "w1" },
  { id: "t17", type: "income", amount: 8500, description: "Salario", categoryId: "salary", date: "2026-02-01", walletId: "w1" },
  { id: "t18", type: "expense", amount: 1850.0, description: "Aluguel", categoryId: "home", date: "2026-02-01", walletId: "w2" },
  { id: "t19", type: "expense", amount: 390.0, description: "Supermercado Pao de Acucar", categoryId: "food", date: "2026-02-15", walletId: "w1" },
  { id: "t20", type: "expense", amount: 120.0, description: "Plano celular", categoryId: "tech", date: "2026-02-10", walletId: "w1" },
]

// ── Bills ──

export const bills: Bill[] = [
  { id: "b1", name: "Internet Vivo", amount: 149.9, dueDate: "2026-03-10", status: "pending", categoryId: "bills" },
  { id: "b2", name: "Energia Enel", amount: 310.0, dueDate: "2026-03-08", status: "pending", categoryId: "bills" },
  { id: "b3", name: "Seguro Auto", amount: 230.0, dueDate: "2026-03-15", status: "pending", categoryId: "transport" },
  { id: "b4", name: "Academia Smart Fit", amount: 109.9, dueDate: "2026-03-05", status: "pending", categoryId: "health" },
  { id: "b5", name: "Condominio", amount: 680.0, dueDate: "2026-03-01", status: "paid", categoryId: "home" },
]

// ── Derived Data ──

export function getTotalBalance(): number {
  return wallets.reduce((sum, w) => sum + w.balance, 0)
}

export function getMonthlyIncome(month: number, year: number): number {
  return transactions
    .filter((t) => t.type === "income" && new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year)
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getMonthlyExpenses(month: number, year: number): number {
  return transactions
    .filter((t) => t.type === "expense" && new Date(t.date).getMonth() === month && new Date(t.date).getFullYear() === year)
    .reduce((sum, t) => sum + t.amount, 0)
}

export function getRecentTransactions(count: number = 5): Transaction[] {
  return [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

export function getUpcomingBills(count: number = 3): Bill[] {
  return bills
    .filter((b) => b.status !== "paid")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, count)
}

export function getTransactionsByDate(): Record<string, Transaction[]> {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  const grouped: Record<string, Transaction[]> = {}
  for (const t of sorted) {
    if (!grouped[t.date]) grouped[t.date] = []
    grouped[t.date].push(t)
  }
  return grouped
}

export const typeIcons: Record<TransactionType, LucideIcon> = {
  income: ArrowDownLeft,
  expense: ArrowUpRight,
  transfer: ArrowLeftRight,
}
