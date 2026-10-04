import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import {
  Container,
  Section,
  SectionHeading,
  Reveal,
  buttonPrimary,
  buttonSecondary,
} from './ui'
import { CTA_LABEL } from '../data/navigation'

const COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { es: 'Primera vez', en: 'First time' },
  title: {
    es: 'Cómo es la primera consulta',
    en: 'What the first consultation looks like',
  },
  formLink: {
    es: 'Ir al formulario de contacto',
    en: 'Go to the contact form',
  },
}

interface Step {
  title: Record<Lang, string>
  text: Record<Lang, string>
}

const STEPS: Step[] = [
  {
    title: { es: 'Contacta', en: 'Get in touch' },
    text: {
      es: 'Envía un mensaje breve por WhatsApp o utiliza el formulario de contacto.',
      en: 'Send a short message via WhatsApp or use the contact form.',
    },
  },
  {
    title: {
      es: 'Confirmamos si la consulta puede realizarse online',
      en: 'We confirm whether the consultation can take place online',
    },
    text: {
      es: 'La consulta responde con información práctica.',
      en: 'The practice replies with practical information.',
    },
  },
  {
    title: { es: 'Concertamos la cita', en: 'We schedule the appointment' },
    text: {
      es: 'Acordamos fecha, hora, precio e instrucciones de conexión.',
      en: 'We agree on the date, time, fee and connection instructions.',
    },
  },
  {
    title: { es: 'Primera consulta', en: 'Initial consultation' },
    text: {
      es: 'La valoración clínica se realiza en el entorno seguro acordado.',
      en: 'The clinical assessment takes place in the agreed secure environment.',
    },
  },
]

export function FirstConsultation() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <div id="primera-consulta" className="scroll-mt-24 bg-sand-50">
      <Section labelledBy="first-consultation-heading">
        <Container>
          <Reveal>
            <SectionHeading
              id="first-consultation-heading"
              eyebrow={pick(lang, COPY.eyebrow)}
              title={pick(lang, COPY.title)}
            />
          </Reveal>

          <div className="relative mt-12">
            <div
              aria-hidden="true"
              className="absolute left-[10%] right-[10%] top-[22px] hidden h-px bg-mist-200 lg:block"
            />
            <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {STEPS.map((step, i) => (
                <li key={pick(lang, step.title)} className="relative">
                  <Reveal delay={Math.min(i * 0.08, 0.24)} className="h-full">
                    <div className="relative flex h-full flex-col rounded-[1.5rem] border border-mist-200 bg-white p-6">
                      <span
                        aria-hidden="true"
                        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 font-display text-lg text-white"
                      >
                        {i + 1}
                      </span>
                      <h3 className="mt-4 font-display text-xl leading-snug text-navy-900">
                        {pick(lang, step.title)}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                        {pick(lang, step.text)}
                      </p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>

          <Reveal className="mt-10">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => requestWhatsApp()}
                className={buttonPrimary}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {pick(lang, CTA_LABEL)}
              </button>
              <Link to="/contacto" className={buttonSecondary}>
                {pick(lang, COPY.formLink)}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </Container>
      </Section>
    </div>
  )
}
