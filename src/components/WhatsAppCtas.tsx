import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import { Container, Reveal } from './ui'
import { CTA_LABEL } from '../data/navigation'

const COPY: Record<string, Record<Lang, string>> = {
  floatLabel: {
    es: 'Contactar por WhatsApp',
    en: 'Contact via WhatsApp',
  },
  bandTitle: {
    es: 'Da el primer paso con tranquilidad',
    en: 'Take the first step with confidence',
  },
  bandText: {
    es: 'Escríbenos por WhatsApp o completa el formulario. Te responderemos para indicarte los siguientes pasos.',
    en: 'Message us on WhatsApp or complete the form. We will reply with the next steps.',
  },
  contactForm: { es: 'Ir al formulario de contacto', en: 'Go to the contact form' },
}

/** Desktop-only floating WhatsApp button (bottom right). */
export function WhatsAppFloat() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <button
      type="button"
      onClick={() => requestWhatsApp()}
      aria-label={pick(lang, COPY.floatLabel)}
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1faa53] text-white shadow-lg shadow-navy-950/20 transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}

/**
 * Mobile-only sticky bottom bar. A spacer reserves the same height in the
 * document flow so the bar never covers page content.
 */
export function StickyMobileBar() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <>
      <div aria-hidden="true" className="h-[92px] md:hidden" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-200 bg-white/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="px-4 pb-4 pt-3">
          <button
            type="button"
            onClick={() => requestWhatsApp()}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#1faa53] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1b9348]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {pick(lang, CTA_LABEL)}
          </button>
        </div>
      </div>
    </>
  )
}

/** Full-width closing call-to-action band. */
export function CtaBand() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <section aria-labelledby="cta-band-title" className="bg-navy-900">
      <Container className="py-16 text-center sm:py-20">
        <Reveal>
          <h2
            id="cta-band-title"
            className="mx-auto max-w-2xl font-display text-3xl leading-tight text-white text-balance sm:text-4xl"
          >
            {pick(lang, COPY.bandTitle)}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-navy-100">
            {pick(lang, COPY.bandText)}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => requestWhatsApp()}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-white px-7 py-3 text-base font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {pick(lang, CTA_LABEL)}
            </button>
            <Link
              to="/contacto"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              {pick(lang, COPY.contactForm)}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
