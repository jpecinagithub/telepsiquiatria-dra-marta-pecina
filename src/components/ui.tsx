import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>
      {children}
    </div>
  )
}

export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id?: string
  children: ReactNode
  className?: string
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn('py-16 sm:py-20 lg:py-24', className)}
    >
      {children}
    </section>
  )
}

/** Subtle fade-up on scroll; disabled entirely under prefers-reduced-motion. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  align = 'center',
}: {
  eyebrow?: string
  title: string
  lead?: string
  id: string
  align?: 'center' | 'left'
}) {
  const alignCls =
    align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={cn('max-w-3xl', alignCls)}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className="mt-3 font-display text-3xl sm:text-4xl leading-tight text-navy-900 text-balance"
      >
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-lg leading-relaxed text-ink-500">{lead}</p>
      )}
    </div>
  )
}

export const buttonPrimary =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-navy-800 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-navy-700 focus-visible:outline-3'

export const buttonSecondary =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-navy-800/25 bg-white/70 px-7 py-3 text-base font-semibold text-navy-800 transition-colors hover:border-navy-800/50 hover:bg-white focus-visible:outline-3'
