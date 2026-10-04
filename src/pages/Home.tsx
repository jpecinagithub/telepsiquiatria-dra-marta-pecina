import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import {
  usePageMeta,
  pageTitle,
  JsonLd,
  physicianJsonLd,
} from '../components/Seo'
import { EmergencyNotice } from '../components/EmergencyNotice'
import {
  Container,
  Section,
  Reveal,
  cn,
  buttonSecondary,
} from '../components/ui'
import { Hero } from '../components/Hero'
import { HowItWorks } from '../components/HowItWorks'
import { Services } from '../components/Services'
import { AboutDoctor } from '../components/AboutDoctor'
import { FirstConsultation } from '../components/FirstConsultation'
import { FaqSection } from '../components/FaqSection'

const COPY = {
  bandHeading: {
    es: 'Una consulta pensada para la distancia',
    en: 'Care designed for distance',
  },
  bandBody1: {
    es: 'La telepsiquiatría permite una valoración médica completa y confidencial sin desplazamientos, con la misma atención y rigor que una consulta presencial.',
    en: 'Telepsychiatry allows a complete, confidential medical assessment without travel, with the same attention and rigor as an in-person visit.',
  },
  bandBody2: {
    es: 'Todo lo que necesitas es un dispositivo con cámara y un espacio tranquilo y privado.',
    en: 'All you need is a device with a camera and a quiet, private space.',
  },
  bandCta: {
    es: 'Saber más sobre telepsiquiatría',
    en: 'Learn more about telepsychiatry',
  },
  bandImageAlt: {
    es: 'Mujer en una videollamada de consulta de telepsiquiatría',
    en: 'Woman in a telepsychiatry video consultation',
  },
} as const

/** Full-width image band between the first-consultation section and the FAQ. */
function DistanceBand() {
  const { lang } = useLanguage()
  return (
    <Section aria-labelledby="distance-band-heading" className="bg-sand-100/60">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal className="order-2 lg:order-1">
            <h2
              id="distance-band-heading"
              className="font-display text-3xl sm:text-4xl leading-tight text-navy-900 text-balance"
            >
              {pick(lang, COPY.bandHeading)}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              {pick(lang, COPY.bandBody1)}
            </p>
            <p className="mt-3 text-lg leading-relaxed text-ink-500">
              {pick(lang, COPY.bandBody2)}
            </p>
            <Link
              to="/telepsiquiatria"
              className={cn(buttonSecondary, 'mt-8')}
            >
              {pick(lang, COPY.bandCta)}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <picture>
              <source
                srcSet="/images/tele-1200.webp"
                media="(min-width: 1024px)"
                type="image/webp"
              />
              <source srcSet="/images/tele-800.webp" type="image/webp" />
              <img
                src="/images/tele-1200.jpg"
                alt={pick(lang, COPY.bandImageAlt)}
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
  )
}

export default function Home() {
  const { lang } = useLanguage()
  usePageMeta({ title: pageTitle('Dra. Marta Peciña', lang), path: '/' })

  return (
    <>
      <Hero />
      <HowItWorks />
      <Services />
      <AboutDoctor />
      <FirstConsultation />
      <DistanceBand />
      <FaqSection />
      <EmergencyNotice />
      <JsonLd data={physicianJsonLd(lang)} />
    </>
  )
}
