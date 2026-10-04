import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { usePageMeta, pageTitle } from '../components/Seo'
import { EmergencyNotice } from '../components/EmergencyNotice'
import {
  Container,
  Section,
  Reveal,
  cn,
  buttonSecondary,
} from '../components/ui'
import { FAQ_ITEMS } from '../data/faq'

const COPY = {
  title: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
  eyebrow: { es: 'Resolvemos tus dudas', en: 'Answering your questions' },
  lead: {
    es: 'Las respuestas a las preguntas más habituales sobre la consulta de telepsiquiatría.',
    en: 'Answers to the most common questions about the telepsychiatry consultation.',
  },
  contactCta: {
    es: 'Si tienes otra pregunta, escríbenos desde la página de contacto.',
    en: 'If you have another question, write to us from the contact page.',
  },
  contactLink: { es: 'Ir a contacto', en: 'Go to contact' },
} as const

function FaqItem({ id, index }: { id: string; index: number }) {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const item = FAQ_ITEMS[index]
  const buttonId = `faq-button-${id}`
  const panelId = `faq-panel-${id}`

  return (
    <div className="rounded-2xl border border-navy-800/10 bg-white/80">
      <h2 className="text-lg">
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-[64px] w-full items-center justify-between gap-4 rounded-2xl px-5 py-4 text-left font-semibold text-navy-900 transition-colors hover:bg-navy-800/5 focus-visible:outline-3 sm:px-7"
        >
          <span>{pick(lang, item.q)}</span>
          <ChevronDown
            className={cn(
              'h-5 w-5 shrink-0 text-teal-700 transition-transform',
              open && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </button>
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="px-5 pb-6 sm:px-7"
      >
        <p className="leading-relaxed text-ink-500">{pick(lang, item.a)}</p>
      </div>
    </div>
  )
}

export default function Faq() {
  const { lang } = useLanguage()
  usePageMeta({
    title: pageTitle(pick(lang, COPY.title), lang),
    path: '/preguntas-frecuentes',
  })

  return (
    <>
      <Section aria-labelledby="faq-heading" className="pt-20 sm:pt-24">
        <Container>
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
              {pick(lang, COPY.eyebrow)}
            </p>
            <h1
              id="faq-heading"
              className="mt-3 max-w-3xl font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
            >
              {pick(lang, COPY.title)}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-ink-500">
              {pick(lang, COPY.lead)}
            </p>
          </Reveal>
          <Reveal className="mt-10">
            <div className="mx-auto max-w-3xl space-y-3">
              {FAQ_ITEMS.map((item, i) => (
                <FaqItem key={item.id} id={item.id} index={i} />
              ))}
            </div>
          </Reveal>
          <Reveal className="mt-12">
            <div className="mx-auto flex max-w-3xl flex-col items-start gap-4 rounded-3xl border border-navy-800/10 bg-mist-100/70 p-6 sm:p-8">
              <p className="text-[15px] leading-relaxed text-ink-500">
                {pick(lang, COPY.contactCta)}
              </p>
              <Link to="/contacto" className={cn(buttonSecondary)}>
                {pick(lang, COPY.contactLink)}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
      <EmergencyNotice />
    </>
  )
}
