import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { MessageCircle, ShieldAlert, X } from 'lucide-react'
import {
  WHATSAPP_INTERSTITIAL_COPY,
  WHATSAPP_PRIVACY_NOTE,
  buildWhatsAppUrl,
} from '../utils/whatsapp'
import { useLanguage, type Lang } from '../i18n/LanguageContext'

interface WhatsAppValue {
  /** Show the privacy interstitial; on confirm, open WhatsApp. */
  requestWhatsApp: (message?: string) => void
  /** Open WhatsApp immediately (used after interstitial confirmation). */
  openWhatsAppNow: (message?: string) => void
}

const WhatsAppContext = createContext<WhatsAppValue | null>(null)

export function useWhatsApp(): WhatsAppValue {
  const ctx = useContext(WhatsAppContext)
  if (!ctx) throw new Error('useWhatsApp must be used inside WhatsAppProvider')
  return ctx
}

function InterstitialModal({
  lang,
  onConfirm,
  onCancel,
}: {
  lang: Lang
  onConfirm: () => void
  onCancel: () => void
}) {
  const copy = WHATSAPP_INTERSTITIAL_COPY[lang]
  const reduce = useReducedMotion()
  const cancelRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    cancelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCancel()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onCancel])

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wa-interstitial-title"
    >
      <motion.div
        className="absolute inset-0 bg-navy-950/50"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        onClick={onCancel}
        aria-hidden="true"
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <button
          ref={cancelRef}
          onClick={onCancel}
          aria-label={copy.cancel}
          className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-500 transition-colors hover:bg-mist-100"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700">
          <ShieldAlert className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2
          id="wa-interstitial-title"
          className="mt-4 font-display text-xl text-navy-900"
        >
          {copy.title}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-500">
          {WHATSAPP_PRIVACY_NOTE[lang]}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={onConfirm}
            className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-full bg-[#1faa53] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1b9348]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {copy.continue}
          </button>
          <button
            onClick={onCancel}
            className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-mist-200 px-6 py-3 text-base font-semibold text-ink-700 transition-colors hover:bg-mist-50"
          >
            {copy.cancel}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage()
  const [pending, setPending] = useState<string | null>(null)

  const openWhatsAppNow = useCallback(
    (message?: string) => {
      window.open(buildWhatsAppUrl(message, lang), '_blank', 'noopener,noreferrer')
    },
    [lang],
  )

  const requestWhatsApp = useCallback((message?: string) => {
    setPending(message ?? '')
  }, [])

  const value = useMemo(
    () => ({ requestWhatsApp, openWhatsAppNow }),
    [requestWhatsApp, openWhatsAppNow],
  )

  return (
    <WhatsAppContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {pending !== null && (
          <InterstitialModal
            lang={lang}
            onConfirm={() => {
              const msg = pending
              setPending(null)
              openWhatsAppNow(msg || undefined)
            }}
            onCancel={() => setPending(null)}
          />
        )}
      </AnimatePresence>
    </WhatsAppContext.Provider>
  )
}
