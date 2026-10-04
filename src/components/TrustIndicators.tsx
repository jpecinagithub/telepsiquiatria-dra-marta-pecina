import {
  Award,
  BookOpen,
  GraduationCap,
  Hospital,
  Microscope,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { Container, Reveal } from './ui'

const COPY: Record<string, Record<Lang, string>> = {
  label: { es: 'Credenciales', en: 'Credentials' },
}

interface Credential {
  icon: LucideIcon
  label: Record<Lang, string>
}

const CREDENTIALS: Credential[] = [
  {
    icon: GraduationCap,
    label: { es: 'Médico, Universidad de Navarra', en: 'MD, University of Navarra' },
  },
  {
    icon: Award,
    label: {
      es: 'Doctora en Neurociencia, Universidad de Navarra',
      en: 'PhD in Neuroscience, University of Navarra',
    },
  },
  {
    icon: Hospital,
    label: {
      es: 'Residencia en Psiquiatría, Clínica Universidad de Navarra',
      en: 'Psychiatry residency, Clínica Universidad de Navarra',
    },
  },
  {
    icon: Microscope,
    label: {
      es: 'Postdoctorado en Neuroimagen, Universidad de Michigan',
      en: 'Postdoctoral training in Neuroimaging, University of Michigan',
    },
  },
  {
    icon: BookOpen,
    label: {
      es: 'Profesora asociada, Universidad de Pittsburgh',
      en: 'Associate Professor, University of Pittsburgh',
    },
  },
]

export function TrustIndicators() {
  const { lang } = useLanguage()

  return (
    <section
      aria-label={pick(lang, COPY.label)}
      className="border-y border-mist-200 bg-white"
    >
      <Container className="py-8 sm:py-10">
        <Reveal>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {CREDENTIALS.map((item) => (
              <li key={pick(lang, item.label)} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700"
                >
                  <item.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium leading-snug text-ink-700">
                  {pick(lang, item.label)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
