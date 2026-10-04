import { AlertTriangle, Check, MessageCircle } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import { Container, Section, SectionHeading, Reveal, buttonPrimary } from './ui'

const COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { es: 'La modalidad', en: 'The format' },
  title: {
    es: '¿Qué es la telepsiquiatría?',
    en: 'What is telepsychiatry?',
  },
  para1: {
    es: 'La telepsiquiatría es la atención psiquiátrica a través de videoconsulta. Es una modalidad reconocida de la práctica médica que permite realizar la entrevista clínica a distancia.',
    en: 'Telepsychiatry is psychiatric care delivered through video consultation. It is a recognized form of medical practice that allows the clinical interview to take place remotely.',
  },
  para2: {
    es: 'La sesión se desarrolla en un entorno de videollamada seguro, de forma similar a una consulta presencial, y requiere únicamente un dispositivo con cámara, micrófono y una conexión estable a internet.',
    en: 'Sessions take place in a secure video-call environment, much like an in-person consultation, and require only a device with a camera and microphone and a stable internet connection.',
  },
  cautionTitle: { es: 'Ten en cuenta', en: 'Please note' },
  caution: {
    es: 'No todas las situaciones clínicas son adecuadas para la teleconsulta.',
    en: 'Not every clinical situation is suitable for teleconsultation.',
  },
  cta: {
    es: 'Consultar si mi caso puede atenderse online',
    en: 'Ask whether my situation can be handled online',
  },
  ctaMessage: {
    es: 'Hola, me gustaría saber si mi caso puede atenderse mediante teleconsulta con la Dra. Marta Peciña.',
    en: 'Hello, I would like to know whether my situation could be handled via teleconsultation with Dr. Marta Peciña.',
  },
}

const BENEFITS: Record<Lang, string[]> = {
  es: [
    'Consulta desde un lugar privado de tu elección',
    'Sin desplazamientos',
    'Continuidad en el seguimiento',
    'Acceso cómodo y seguro',
    'Adecuada para muchas formas de seguimiento psiquiátrico',
  ],
  en: [
    'Consult from a private place of your choice',
    'No travel needed',
    'Continuity of follow-up care',
    'Secure and convenient access',
    'Suitable for many forms of psychiatric follow-up',
  ],
}

export function HowItWorks() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <Section
      id="telepsiquiatria"
      labelledBy="how-it-works-heading"
      className="scroll-mt-24 bg-mist-50"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="how-it-works-heading"
            align="left"
            eyebrow={pick(lang, COPY.eyebrow)}
            title={pick(lang, COPY.title)}
          />
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="lg:col-span-3">
            <div className="space-y-5 text-lg leading-relaxed text-ink-700">
              <p>{pick(lang, COPY.para1)}</p>
              <p>{pick(lang, COPY.para2)}</p>
            </div>

            <ul className="mt-8 space-y-4">
              {BENEFITS[lang].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700"
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-[17px] text-ink-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-[1.5rem] border border-sand-200 bg-sand-100 p-6 sm:p-7">
                <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-navy-800">
                  <AlertTriangle
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  {pick(lang, COPY.cautionTitle)}
                </p>
                <p className="mt-3 leading-relaxed text-ink-700">
                  {pick(lang, COPY.caution)}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  requestWhatsApp(pick(lang, COPY.ctaMessage))
                }
                className={buttonPrimary}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {pick(lang, COPY.cta)}
              </button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
