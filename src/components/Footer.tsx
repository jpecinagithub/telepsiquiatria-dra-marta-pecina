import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { practiceConfig } from '../config/practice'
import { LEGAL_ITEMS, NAV_ITEMS } from '../data/navigation'
import { WHATSAPP_DISPLAY } from '../utils/whatsapp'
import { useWhatsApp } from './WhatsAppProvider'
import { Container } from './ui'

const COPY = {
  tagline: {
    es: 'Consulta de telepsiquiatría',
    en: 'Telepsychiatry consultation',
  },
  contactTitle: {
    es: 'Contacto',
    en: 'Contact',
  },
  whatsappCta: {
    es: 'Escribir por WhatsApp',
    en: 'Message on WhatsApp',
  },
  emergency: {
    es: 'Esta consulta no es un servicio de urgencias. En España, llama al 112.',
    en: 'This practice is not an emergency service. In Spain, call 112.',
  },
  rights: {
    es: '© {year} Dra. Marta Peciña. Todos los derechos reservados.',
    en: '© {year} Dr. Marta Peciña. All rights reserved.',
  },
  authorBy: { es: 'Created by', en: 'Created by' },
} as const

export function Footer() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 text-white/80" aria-label="Footer">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src="/logo.jpg"
              alt={
                lang === 'es'
                  ? 'Dra. Marta Peciña — Consulta de Telepsiquiatría'
                  : 'Dr. Marta Peciña — Telepsychiatry Consultation'
              }
              className="h-14 w-auto rounded-lg bg-white px-3 py-1.5"
              loading="lazy"
            />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
              {pick(lang, COPY.tagline)} — {practiceConfig.doctorName},{' '}
              {practiceConfig.credentials}.
            </p>
            <p className="mt-4 max-w-sm border-l-2 border-teal-500/60 pl-4 text-sm leading-relaxed text-white/60">
              {pick(lang, COPY.emergency)}
            </p>
          </div>

          <nav aria-label={lang === 'es' ? 'Navegación' : 'Navigation'}>
            <ul className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-[44px] items-center rounded text-[15px] text-white/75 transition-colors hover:text-white"
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
              {pick(lang, COPY.contactTitle)}
            </h2>
            <div className="mt-4 space-y-3">
              <button
                onClick={() => requestWhatsApp()}
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {WHATSAPP_DISPLAY}
              </button>
              {practiceConfig.email && (
                <p>
                  <a
                    href={`mailto:${practiceConfig.email}`}
                    className="inline-flex min-h-[44px] items-center text-[15px] text-white/75 underline-offset-4 hover:text-white hover:underline"
                  >
                    {practiceConfig.email}
                  </a>
                </p>
              )}
            </div>
            <ul className="mt-6 space-y-1">
              {LEGAL_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex min-h-[44px] items-center rounded text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {item.label[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        <div className="flex flex-col items-start justify-between gap-3 text-sm text-white/50 sm:flex-row sm:items-center">
          <p>{pick(lang, COPY.rights).replace('{year}', String(year))}</p>
          <p>
            {pick(lang, COPY.authorBy)}{' '}
            <span className="text-white/70">Jon Peciña</span>
            {' · '}
            <a
              href="mailto:jpecina@gmail.com"
              className="underline-offset-4 hover:text-white hover:underline"
            >
              jpecina@gmail.com
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
