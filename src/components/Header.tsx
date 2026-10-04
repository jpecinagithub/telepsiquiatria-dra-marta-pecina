import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Menu, MessageCircle, X } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import { Container, cn } from './ui'
import { NAV_ITEMS, CTA_LABEL } from '../data/navigation'

const COPY: Record<string, Record<Lang, string>> = {
  openMenu: { es: 'Abrir menú', en: 'Open menu' },
  closeMenu: { es: 'Cerrar menú', en: 'Close menu' },
  mainNav: { es: 'Navegación principal', en: 'Main navigation' },
  mobileNav: { es: 'Menú de navegación', en: 'Navigation menu' },
  language: { es: 'Idioma', en: 'Language' },
  logoAlt: {
    es: 'Logotipo de la consulta de la Dra. Marta Peciña',
    en: 'Logo of Dr. Marta Peciña’s practice',
  },
}

const LANG_NAMES: Record<Lang, Record<Lang, string>> = {
  es: { es: 'Español', en: 'Spanish' },
  en: { es: 'Inglés', en: 'English' },
}

function LanguageSwitcher({ onSelect }: { onSelect?: () => void }) {
  const { lang, setLang } = useLanguage()
  return (
    <div
      role="group"
      aria-label={pick(lang, COPY.language)}
      className="inline-flex items-center rounded-full border border-mist-200 p-1"
    >
      {(['es', 'en'] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => {
            setLang(l)
            onSelect?.()
          }}
          aria-pressed={lang === l}
          aria-label={pick(lang, LANG_NAMES[l])}
          className={cn(
            'inline-flex min-h-[44px] min-w-[52px] items-center justify-center rounded-full px-3 text-sm font-semibold transition-colors',
            lang === l
              ? 'bg-navy-800 text-white'
              : 'text-ink-500 hover:text-navy-800',
          )}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export function Header() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      'inline-flex min-h-[44px] items-center px-3 text-[15px] font-medium text-ink-500 transition-colors hover:text-navy-800',
      isActive &&
        'text-navy-800 underline decoration-teal-600 decoration-2 underline-offset-8',
    )

  const handleCta = () => {
    setOpen(false)
    requestWhatsApp()
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-mist-200 bg-white/95 backdrop-blur">
        <Container className="flex h-[72px] items-center justify-between gap-4">
          <Link to="/" className="shrink-0 rounded-lg">
            <img
              src="/logo.jpg"
              alt={pick(lang, COPY.logoAlt)}
              width={1024}
              height={254}
              className="h-11 w-auto sm:h-12"
            />
          </Link>

          <nav
            aria-label={pick(lang, COPY.mainNav)}
            className="hidden lg:block"
          >
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={navLinkClass}>
                    {pick(lang, item.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => requestWhatsApp()}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-navy-800 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {pick(lang, CTA_LABEL)}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={pick(lang, COPY.openMenu)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-mist-100 lg:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-navy-950/50 lg:hidden"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduce ? undefined : { opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={pick(lang, COPY.mobileNav)}
              className="fixed inset-y-0 right-0 z-50 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl lg:hidden"
              initial={reduce ? false : { x: '100%' }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: '100%' }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-end border-b border-mist-200 p-4">
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={pick(lang, COPY.closeMenu)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-mist-100"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <nav
                aria-label={pick(lang, COPY.mobileNav)}
                className="flex-1 overflow-y-auto px-4 py-4"
              >
                <ul className="flex flex-col">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            'flex min-h-[52px] items-center rounded-xl px-3 text-lg font-medium text-ink-700 transition-colors hover:bg-mist-50 hover:text-navy-800',
                            isActive && 'bg-navy-50 text-navy-800',
                          )
                        }
                      >
                        {pick(lang, item.label)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-4 border-t border-mist-200 p-5">
                <LanguageSwitcher onSelect={() => setOpen(false)} />
                <button
                  type="button"
                  onClick={handleCta}
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-navy-800 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-navy-700"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  {pick(lang, CTA_LABEL)}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
