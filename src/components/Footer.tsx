import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { practiceConfig } from '../config/practice'
import { LEGAL_ITEMS } from '../data/navigation'
import { WHATSAPP_DISPLAY } from '../utils/whatsapp'
import { useWhatsApp } from './WhatsAppProvider'
import { Container } from './ui'

const COPY = {
  contactTitle: {
    es: 'Contacto',
    en: 'Contact',
  },
  whatsappCta: {
    es: 'Escribir por WhatsApp',
    en: 'Message on WhatsApp',
  },
} as const

export function Footer() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <footer className="bg-navy-950 text-white/80" aria-label="Footer">
      <Container className="py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/50">
              {pick(lang, COPY.contactTitle)}
            </h2>
            <button
              onClick={() => requestWhatsApp()}
              aria-label={pick(lang, COPY.whatsappCta)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {WHATSAPP_DISPLAY}
            </button>
            {practiceConfig.email && (
              <a
                href={`mailto:${practiceConfig.email}`}
                className="inline-flex min-h-[44px] items-center text-[15px] text-white/75 underline-offset-4 hover:text-white hover:underline"
              >
                {practiceConfig.email}
              </a>
            )}
          </div>

          <nav
            aria-label={
              lang === 'es' ? 'Información legal' : 'Legal information'
            }
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
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
          </nav>
        </div>
      </Container>
    </footer>
  )
}
