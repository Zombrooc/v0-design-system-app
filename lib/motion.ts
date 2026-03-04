import type { Variants } from "framer-motion"

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.18, ease: [0.4, 0, 0.2, 1] } },
}

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
}

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
  },
}

export const sheetVariants: Variants = {
  initial: { y: "100%" },
  animate: { y: 0, transition: { duration: 0.28, ease: [0.32, 0.72, 0, 1] } },
  exit: { y: "100%", transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } },
}

export const fabVariants: Variants = {
  collapsed: { scale: 1 },
  expanded: { scale: 1.05, transition: { duration: 0.2, ease: [0.32, 0.72, 0, 1] } },
}

export const fabItemVariants: Variants = {
  collapsed: { opacity: 0, y: 8, scale: 0.9 },
  expanded: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.2,
      ease: [0.32, 0.72, 0, 1],
    },
  }),
}
