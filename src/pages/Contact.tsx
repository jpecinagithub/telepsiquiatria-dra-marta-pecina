import { MessageCircle, Mail } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { useWhatsApp } from '../components/WhatsAppProvider'
import { usePageMeta, pageTitle } from '../components/Seo'
import { EmergencyNotice } from '../components/EmergencyNotice'
import {
  Container,
  Section,
  Reveal,
  buttonPrimary,
} from '../components/ui'
import { practiceConfig } from '../config/practice'
import { CTA_LABEL } from '../data/navigation'

const COPY = {
  title: { es: 'Primer contacto', en: 'First contact' },
  intro: {
    es: 'Si deseas información sobre una consulta, escríbenos por WhatsApp. Te responderemos para indicarte los siguientes pasos.',
    en: 'If you would like information about a consultation, message us on WhatsApp. We will reply with the next steps.',
  },
  waHeading: { es: 'WhatsApp', en: 'WhatsApp' },
  waBody: {
    es: 'La vía más rápida para el primer contacto. Al continuar verás un aviso de privacidad antes de abrir WhatsApp.',
    en: 'The fastest way to make first contact. Before continuing you will see a privacy notice before WhatsApp opens.',
  },
  emailLabel: { es: 'Correo electrónico', en: 'Email' },
} as const

export default function Contact() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()
  usePageMeta({
    title: pageTitle(pick(lang, COPY.title), lang),
    path: '/contacto',
  })

  return (
    <>
      <Section aria-labelledby="contact-heading" className="pt-20 sm:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <h1
                id="contact-heading"
                className="font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
              >
                {pick(lang, COPY.title)}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink-500">
                {pick(lang, COPY.intro)}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="mt-10">
              <div className="rounded-3xl border border-teal-700/25 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-700/10 text-teal-700">
                    <MessageCircle className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-semibold text-navy-900">
                      {pick(lang, COPY.waHeading)}
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                      {pick(lang, COPY.waBody)}
                    </p>
                    <button
                      type="button"
                      onClick={() => requestWhatsApp()}
                      className={buttonPrimary + ' mt-5 bg-teal-700 hover:bg-teal-600'}
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      {CTA_LABEL[lang]}
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>

            {practiceConfig.email && (
              <Reveal className="mt-6">
                <p className="flex min-h-[44px] items-center gap-2 text-[15px] text-ink-500">
                  <Mail className="h-5 w-5 text-teal-700" aria-hidden="true" />
                  <span className="font-medium text-navy-900">
                    {pick(lang, COPY.emailLabel)}:{' '}
                  </span>
                  <a
                    href={`mailto:${practiceConfig.email}`}
                    className="text-teal-700 underline underline-offset-2"
                  >
                    {practiceConfig.email}
                  </a>
                </p>
              </Reveal>
            )}
          </div>
        </Container>
      </Section>
      <EmergencyNotice compact />
    </>
  )
}
