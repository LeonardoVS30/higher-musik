import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'span'
}

/**
 * Wraps content in a subtle opacity + translateY reveal that replays
 * when the element enters the viewport. Keeps every section's motion
 * consistent without repeating the same framer-motion props everywhere.
 */
export default function Reveal({ children, delay = 0, y = 36, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(16px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: false, amount: 0.2, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 1.05, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
