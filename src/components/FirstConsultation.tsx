import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { Container, Section, SectionHeading, Reveal } from './ui'

const COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { es: 'Primera vez', en: 'First time' },
  title: {
    es: 'Cómo es la primera consulta',
    en: 'What the first consultation looks like',
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
      es: 'Envía un mensaje breve por WhatsApp.',
      en: 'Send a short message via WhatsApp.',
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
        </Container>
      </Section>
    </div>
  )
}
