import { Linkedin, GraduationCap, Award, ClipboardList, Microscope, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { usePageMeta, pageTitle } from '../components/Seo'
import {
  Container,
  Section,
  SectionHeading,
  Reveal,
  cn,
  buttonSecondary,
} from '../components/ui'
import { practiceConfig } from '../config/practice'

const COPY = {
  eyebrow: { es: 'La Dra. Peciña', en: 'Dr. Peciña' },
  heading: { es: 'Dra. Marta Peciña, MD, PhD', en: 'Dr. Marta Peciña, MD, PhD' },
  intro1: {
    es: 'La Dra. Marta Peciña es psiquiatra y doctora en Neurociencia. Su trayectoria combina práctica clínica, investigación y docencia universitaria, con especial interés en los trastornos del estado de ánimo y en los mecanismos cerebrales relacionados con la respuesta al tratamiento.',
    en: 'Dr. Marta Peciña is a psychiatrist and a PhD in Neuroscience. Her career combines clinical practice, research and university teaching, with a special interest in mood disorders and in the brain mechanisms related to treatment response.',
  },
  intro2: {
    es: 'Su enfoque parte de una valoración médica rigurosa y personalizada, teniendo en cuenta tanto los síntomas como la historia, las circunstancias y las necesidades de cada persona.',
    en: 'Her approach starts from a rigorous, personalized medical assessment, taking into account each person\u2019s symptoms, history, circumstances and needs.',
  },
  trajectoryEyebrow: { es: 'Formación y carrera', en: 'Education and career' },
  trajectoryTitle: { es: 'Trayectoria', en: 'Career' },
  areasEyebrow: { es: 'Investigación y clínica', en: 'Research and clinical work' },
  areasTitle: {
    es: 'Áreas de interés académico y clínico',
    en: 'Academic and clinical areas of interest',
  },
  areasNote: {
    es: 'Estas áreas reflejan su trayectoria académica e investigadora; la indicación concreta de cada consulta se valora de forma individual.',
    en: 'These areas reflect her academic and research career; the specific indication for each consultation is assessed individually.',
  },
  linkedin: { es: 'Ver perfil de LinkedIn', en: 'View LinkedIn profile' },
  imageAlt: {
    es: 'Detalle tranquilo: taza de té y luz cálida en un espacio de consulta',
    en: 'Calm detail: a cup of tea and warm light in a consultation space',
  },
} as const

const TRAJECTORY: Array<{
  title: Record<'en' | 'es', string>
  place: string
  icon: LucideIcon
}> = [
  {
    title: { es: 'Licenciatura en Medicina', en: 'Medical Degree' },
    place: 'University of Navarra',
    icon: GraduationCap,
  },
  {
    title: { es: 'Doctorado en Neurociencia', en: 'PhD in Neuroscience' },
    place: 'University of Navarra',
    icon: Award,
  },
  {
    title: { es: 'Residencia en Psiquiatría', en: 'Psychiatry residency' },
    place: 'Clínica Universidad de Navarra (University of Navarra Medical Center)',
    icon: ClipboardList,
  },
  {
    title: {
      es: 'Formación postdoctoral en Neuroimagen',
      en: 'Postdoctoral training in Neuroimaging',
    },
    place: 'University of Michigan',
    icon: Microscope,
  },
  {
    title: {
      es: 'Profesora Asociada de Psiquiatría e Ingeniería Biomédica',
      en: 'Associate Professor of Psychiatry and Bioengineering',
    },
    place: 'University of Pittsburgh',
    icon: BookOpen,
  },
]

const AREAS: Array<Record<'en' | 'es', string>> = [
  { es: 'Trastornos del estado de ánimo', en: 'Mood disorders' },
  { es: 'Depresión', en: 'Depression' },
  { es: 'Trastornos relacionados con la ansiedad', en: 'Anxiety-related conditions' },
  { es: 'Neurociencia', en: 'Neuroscience' },
  { es: 'Neuroimagen', en: 'Neuroimaging' },
  { es: 'Neuromodulación', en: 'Neuromodulation' },
]

export default function About() {
  const { lang } = useLanguage()
  usePageMeta({ title: pageTitle('Dra. Marta Peciña', lang), path: '/la-dra-pecina' })

  return (
    <>
      <Section aria-labelledby="about-heading" className="pt-20 sm:pt-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                {pick(lang, COPY.eyebrow)}
              </p>
              <h1
                id="about-heading"
                className="mt-3 font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
              >
                {pick(lang, COPY.heading)}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ink-500">
                {pick(lang, COPY.intro1)}
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-500">
                {pick(lang, COPY.intro2)}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <picture>
                <source srcSet="/images/detail-1200.webp" type="image/webp" />
                <img
                  src="/images/detail-1200.jpg"
                  alt={pick(lang, COPY.imageAlt)}
                  width={1200}
                  height={800}
                  loading="lazy"
                  className="w-full rounded-3xl object-cover shadow-lg"
                />
              </picture>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section
        aria-labelledby="trajectory-heading"
        className="bg-mist-100/60"
      >
        <Container>
          <SectionHeading
            id="trajectory-heading"
            eyebrow={pick(lang, COPY.trajectoryEyebrow)}
            title={pick(lang, COPY.trajectoryTitle)}
            align="left"
          />
          <Reveal className="mt-10">
            <ol className="max-w-3xl space-y-0">
              {TRAJECTORY.map((item, i) => (
                <li
                  key={`${item.title.en}-${i}`}
                  className="flex items-start gap-5 border-b border-navy-800/10 py-6 first:border-t"
                >
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-700/10 text-teal-700"
                    aria-hidden="true"
                  >
                    <item.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-lg font-semibold text-navy-900">
                      {pick(lang, item.title)}
                    </p>
                    <p className="mt-1 text-ink-500">{item.place}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </Container>
      </Section>

      <Section aria-labelledby="areas-heading">
        <Container>
          <SectionHeading
            id="areas-heading"
            eyebrow={pick(lang, COPY.areasEyebrow)}
            title={pick(lang, COPY.areasTitle)}
            align="left"
          />
          <Reveal className="mt-10">
            <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
              {AREAS.map((area) => (
                <li
                  key={area.en}
                  className="rounded-2xl border border-navy-800/10 bg-white/80 px-5 py-4 text-ink-600"
                >
                  {pick(lang, area)}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-500">
              {pick(lang, COPY.areasNote)}
            </p>
            {practiceConfig.linkedInUrl && (
              <a
                href={practiceConfig.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonSecondary, 'mt-8')}
              >
                <Linkedin className="h-5 w-5" aria-hidden="true" />
                {pick(lang, COPY.linkedin)}
              </a>
            )}
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
