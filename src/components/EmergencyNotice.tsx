import { TriangleAlert } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { Container, Reveal } from './ui'

const COPY = {
  title: {
    es: 'Esta consulta no es un servicio de urgencias.',
    en: 'This practice is not an emergency service.',
  },
  body: {
    es: 'Si existe riesgo inmediato para ti o para otra persona, síntomas graves o una situación de emergencia, contacta con los servicios de urgencias de tu zona. En España, llama al 112.',
    en: 'If there is an immediate risk to you or to someone else, severe symptoms, or an emergency situation, contact the emergency services in your area. In Spain, call 112.',
  },
  whatsappNote: {
    es: 'WhatsApp no es un canal de urgencias.',
    en: 'WhatsApp is not an emergency channel.',
  },
} as const

/**
 * Mandatory emergency notice. Rendered on: Home (before footer), FAQ page,
 * and Contact page.
 */
export function EmergencyNotice({ compact = false }: { compact?: boolean }) {
  const { lang } = useLanguage()
  return (
    <div className="bg-mist-100/70">
      <Container className={compact ? 'py-8' : 'py-12'}>
        <Reveal>
          <div
            role="note"
            aria-label={pick(lang, COPY.title)}
            className="mx-auto flex max-w-4xl items-start gap-4 rounded-3xl border border-navy-800/15 bg-white/80 p-6 sm:p-8"
          >
            <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy-800/10 text-navy-800">
              <TriangleAlert className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-navy-900">
                {pick(lang, COPY.title)}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                {pick(lang, COPY.body)}
              </p>
              <p className="mt-2 text-sm font-medium text-ink-500">
                {pick(lang, COPY.whatsappNote)}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  )
}
