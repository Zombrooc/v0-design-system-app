"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface FABProps {
  onAdd?: () => void
  className?: string
}

export function FAB({ onAdd, className }: FABProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    if (onAdd) {
      onAdd()
    } else {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={cn("fixed z-[var(--z-sticky)]", className)}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-overlay)]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.button
        onClick={handleClick}
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-md)] transition-transform active:scale-95"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Nova transacao"
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          {isOpen ? <X className="size-5" /> : <Plus className="size-5" />}
        </motion.div>
      </motion.button>
    </div>
  )
}
