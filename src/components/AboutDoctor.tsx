import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { Container, Section, SectionHeading, Reveal, cn, buttonSecondary } from './ui'

const COPY: Record<string, Record<Lang, string>> = {
  title: { es: 'Dra. Marta Peciña, MD, PhD', en: 'Dr. Marta Peciña, MD, PhD' },
  eyebrow: { es: 'La doctora', en: 'The doctor' },
  para1: {
    es: 'La Dra. Marta Peciña es psiquiatra y doctora en Neurociencia. Su trayectoria combina práctica clínica, investigación y docencia universitaria, con especial interés en los trastornos del estado de ánimo y en los mecanismos cerebrales relacionados con la respuesta al tratamiento.',
    en: 'Dr. Marta Peciña is a psychiatrist with a PhD in Neuroscience. Her career combines clinical practice, research, and university teaching, with a particular interest in mood disorders and in the brain mechanisms related to treatment response.',
  },
  para2: {
    es: 'Su enfoque parte de una valoración médica rigurosa y personalizada, teniendo en cuenta tanto los síntomas como la historia, las circunstancias y las necesidades de cada persona.',
    en: 'Her approach is based on a rigorous, personalized medical assessment that takes into account not only the symptoms, but also each person’s history, circumstances, and needs.',
  },
  toggle: {
    es: 'Ver trayectoria profesional',
    en: 'View professional background',
  },
  toggleClose: {
    es: 'Ocultar trayectoria profesional',
    en: 'Hide professional background',
  },
  areasLabel: {
    es: 'Áreas de especial interés',
    en: 'Areas of special interest',
  },
  note: {
    es: 'Estas áreas reflejan su trayectoria académica; la indicación concreta de cada consulta se valora de forma individual.',
    en: 'These areas reflect her academic background; the specific indication for each consultation is assessed individually.',
  },
  learnMore: { es: 'Saber más', en: 'Learn more' },
  imageAlt: {
    es: 'Detalle sereno de un escritorio con cuaderno, ordenador portátil y planta junto a la ventana, con luz natural',
    en: 'A serene desk detail with a notebook, laptop and plant by the window, in natural light',
  },
}

interface Milestone {
  name: Record<Lang, string>
  place: Record<Lang, string>
}

const MILESTONES: Milestone[] = [
  {
    name: { es: 'Título de Médico', en: 'Medical Degree' },
    place: { es: 'Universidad de Navarra', en: 'University of Navarra' },
  },
  {
    name: { es: 'Doctorado en Neurociencia', en: 'PhD in Neuroscience' },
    place: { es: 'Universidad de Navarra', en: 'University of Navarra' },
  },
  {
    name: { es: 'Residencia en Psiquiatría', en: 'Psychiatry residency' },
    place: {
      es: 'Clínica Universidad de Navarra',
      en: 'Clínica Universidad de Navarra',
    },
  },
  {
    name: {
      es: 'Formación postdoctoral en Neuroimagen',
      en: 'Postdoctoral training in Neuroimaging',
    },
    place: { es: 'Universidad de Michigan', en: 'University of Michigan' },
  },
  {
    name: {
      es: 'Profesora asociada de Psiquiatría y Bioingeniería',
      en: 'Associate Professor of Psychiatry and Bioengineering',
    },
    place: { es: 'Universidad de Pittsburgh', en: 'University of Pittsburgh' },
  },
]

const AREAS: Record<Lang, string[]> = {
  es: [
    'Trastornos del estado de ánimo',
    'Depresión',
    'Trastornos de ansiedad',
    'Neurociencia',
    'Neuroimagen',
    'Neuromodulación',
  ],
  en: [
    'Mood disorders',
    'Depression',
    'Anxiety-related conditions',
    'Neuroscience',
    'Neuroimaging',
    'Neuromodulation',
  ],
}

export function AboutDoctor() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <Section
      id="la-doctora"
      labelledBy="about-doctor-heading"
      className="scroll-mt-24 bg-sand-50"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="about-doctor-heading"
            align="left"
            eyebrow={pick(lang, COPY.eyebrow)}
            title={pick(lang, COPY.title)}
          />
        </Reveal>

        <div className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="space-y-5 text-lg leading-relaxed text-ink-700">
              <p>{pick(lang, COPY.para1)}</p>
              <p>{pick(lang, COPY.para2)}</p>
            </div>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="trayectoria-panel"
              className={cn(buttonSecondary, 'mt-7')}
            >
              {open ? pick(lang, COPY.toggleClose) : pick(lang, COPY.toggle)}
              <ChevronDown
                className={cn(
                  'h-5 w-5 transition-transform',
                  open && 'rotate-180',
                )}
                aria-hidden="true"
              />
            </button>
          </Reveal>

          <Reveal delay={0.1}>
            <picture>
              <source
                type="image/webp"
                media="(min-width: 1024px)"
                srcSet="/images/detail-1200.webp"
              />
              <source type="image/webp" srcSet="/images/detail-800.webp" />
              <source
                type="image/jpeg"
                media="(min-width: 1024px)"
                srcSet="/images/detail-1200.jpg"
              />
              <img
                src="/images/detail-800.jpg"
                alt={pick(lang, COPY.imageAlt)}
                width={1200}
                height={800}
                loading="lazy"
                className="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-lg shadow-navy-900/10"
              />
            </picture>
          </Reveal>
        </div>

        <div
          id="trayectoria-panel"
          role="region"
          aria-label={pick(lang, COPY.toggle)}
          hidden={!open}
          className="mt-10"
        >
          <div className="rounded-[1.75rem] border border-mist-200 bg-white p-6 sm:p-10">
            <ul className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {MILESTONES.map((m) => (
                <li key={pick(lang, m.name)} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-teal-600"
                  />
                  <div>
                    <p className="font-semibold text-navy-900">
                      {pick(lang, m.name)}
                    </p>
                    <p className="text-[15px] text-ink-500">
                      {pick(lang, m.place)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-mist-200 pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-teal-700">
                {pick(lang, COPY.areasLabel)}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {AREAS[lang].map((area) => (
                  <li
                    key={area}
                    className="rounded-full bg-navy-50 px-4 py-2 text-sm font-medium text-navy-800"
                  >
                    {area}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-ink-500">
                {pick(lang, COPY.note)}
              </p>
            </div>
          </div>
        </div>

        <Reveal className="mt-10">
          <Link
            to="/la-dra-pecina"
            className="inline-flex min-h-[44px] items-center gap-2 text-base font-semibold text-navy-800 underline decoration-teal-600 decoration-2 underline-offset-4 transition-colors hover:text-navy-700"
          >
            {pick(lang, COPY.learnMore)}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
