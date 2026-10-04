import {
  CalendarCheck,
  ClipboardCheck,
  ClipboardList,
  CloudSun,
  HeartHandshake,
  Info,
  MessagesSquare,
  Wind,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { Container, Section, SectionHeading, Reveal } from './ui'

const COPY: Record<string, Record<Lang, string>> = {
  title: {
    es: '¿En qué situaciones puede ser útil una consulta?',
    en: 'When might a consultation be helpful?',
  },
  eyebrow: { es: 'Motivos de consulta', en: 'Reasons to consult' },
  disclaimer: {
    es: 'La indicación concreta de una valoración o tratamiento se determina de forma individual.',
    en: 'Whether an assessment or treatment is appropriate is determined individually.',
  },
}

interface Service {
  icon: LucideIcon
  title: Record<Lang, string>
  text: Record<Lang, string>
}

const SERVICES: Service[] = [
  {
    icon: CloudSun,
    title: { es: 'Estado de ánimo y depresión', en: 'Mood and depression' },
    text: {
      es: 'Si notas un estado de ánimo bajo o una pérdida de interés persistente, puedes plantear tu situación en una primera valoración.',
      en: 'If you notice a persistently low mood or loss of interest, you may wish to discuss your situation in an initial assessment.',
    },
  },
  {
    icon: Wind,
    title: { es: 'Ansiedad', en: 'Anxiety' },
    text: {
      es: 'Cuando la ansiedad o la preocupación interfieren en tu día a día, puedes consultar qué opciones de valoración existen.',
      en: 'When anxiety or worry interfere with your daily life, you may wish to ask about the available assessment options.',
    },
  },
  {
    icon: HeartHandshake,
    title: {
      es: 'Dificultades emocionales persistentes',
      en: 'Persistent emotional difficulties',
    },
    text: {
      es: 'Si las dificultades emocionales se mantienen en el tiempo, una valoración profesional puede ayudar a clarificarlas.',
      en: 'If emotional difficulties persist over time, a professional assessment may help clarify them.',
    },
  },
  {
    icon: ClipboardCheck,
    title: {
      es: 'Revisión de tratamiento psiquiátrico',
      en: 'Psychiatric treatment review',
    },
    text: {
      es: 'Si estás en tratamiento psiquiátrico y quieres revisar su evolución, puedes solicitar una valoración de seguimiento.',
      en: 'If you are in psychiatric treatment and would like to review how it is progressing, you may request a follow-up assessment.',
    },
  },
  {
    icon: MessagesSquare,
    title: { es: 'Segunda opinión', en: 'Second opinion' },
    text: {
      es: 'Si buscas una segunda valoración sobre un diagnóstico o plan de tratamiento, puedes plantearlo en consulta.',
      en: 'If you are looking for a second opinion on a diagnosis or treatment plan, you may wish to raise it in a consultation.',
    },
  },
  {
    icon: CalendarCheck,
    title: { es: 'Seguimiento psiquiátrico', en: 'Psychiatric follow-up' },
    text: {
      es: 'La teleconsulta permite mantener un seguimiento psiquiátrico continuado cuando resulta adecuado.',
      en: 'Teleconsultation allows continued psychiatric follow-up when appropriate.',
    },
  },
  {
    icon: ClipboardList,
    title: {
      es: 'Valoración clínica inicial',
      en: 'Initial clinical assessment',
    },
    text: {
      es: 'Una primera valoración clínica ayuda a comprender tu situación y a estudiar los siguientes pasos.',
      en: 'An initial clinical assessment helps to understand your situation and consider the next steps.',
    },
  },
]

export function Services() {
  const { lang } = useLanguage()

  return (
    <Section labelledBy="services-heading" className="bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            id="services-heading"
            eyebrow={pick(lang, COPY.eyebrow)}
            title={pick(lang, COPY.title)}
          />
        </Reveal>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <li key={pick(lang, service.title)}>
              <Reveal delay={Math.min(i * 0.06, 0.3)} className="h-full">
                <article className="flex h-full flex-col rounded-[1.5rem] border border-mist-200 bg-sand-50 p-6 transition-colors hover:border-teal-600/40 sm:p-7">
                  <span
                    aria-hidden="true"
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700"
                  >
                    <service.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display text-xl text-navy-900">
                    {pick(lang, service.title)}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    {pick(lang, service.text)}
                  </p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-8">
          <p className="mx-auto flex max-w-2xl items-start justify-center gap-2 text-center text-sm leading-relaxed text-ink-500">
            <Info
              className="mt-0.5 h-4 w-4 shrink-0 text-teal-700"
              aria-hidden="true"
            />
            <span>{pick(lang, COPY.disclaimer)}</span>
          </p>
        </Reveal>
      </Container>
    </Section>
  )
}
