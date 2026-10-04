import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import { Container, Reveal, buttonPrimary, buttonSecondary } from './ui'
import { CTA_LABEL } from '../data/navigation'

const COPY: Record<string, Record<Lang, string>> = {
  eyebrow: {
    es: 'Consulta de telepsiquiatría',
    en: 'Telepsychiatry consultation',
  },
  title: {
    es: 'Psiquiatría especializada, estés donde estés.',
    en: 'Specialist psychiatry, wherever you are.',
  },
  sub: {
    es: 'Consulta de telepsiquiatría con la Dra. Marta Peciña, MD, PhD. Un espacio profesional y confidencial para valorar tu situación y estudiar contigo los siguientes pasos.',
    en: 'Telepsychiatry consultations with Dr. Marta Peciña, MD, PhD. A professional, confidential space to assess your situation and consider the next steps with you.',
  },
  howItWorks: { es: 'Cómo funciona', en: 'How it works' },
  imageAlt: {
    es: 'Sala de consulta tranquila y luminosa, con sillones, escritorio y ordenador portátil, preparada para una videoconsulta',
    en: 'A calm, bright consultation room with armchairs, a desk and a laptop, set up for a video consultation',
  },
}

const REASSURANCE: Record<Lang, string[]> = {
  es: [
    'Contacto inicial sencillo',
    'Atención individualizada',
    'Consulta online',
  ],
  en: [
    'Simple initial contact',
    'Individualized care',
    'Online consultations',
  ],
}

export function Hero() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()
  const reassurance = REASSURANCE[lang]

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-br from-mist-50 via-sand-50 to-sand-100"
    >
      <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
            {pick(lang, COPY.eyebrow)}
          </p>
          <h1
            id="hero-title"
            className="mt-4 font-display text-4xl leading-tight text-navy-900 text-balance sm:text-5xl"
          >
            {pick(lang, COPY.title)}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-500">
            {pick(lang, COPY.sub)}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => requestWhatsApp()}
              className={buttonPrimary}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {pick(lang, CTA_LABEL)}
            </button>
            <Link to="/#primera-consulta" className={buttonSecondary}>
              {pick(lang, COPY.howItWorks)}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-500">
            {reassurance.map((item, i) => (
              <span key={item}>
                {item}
                {i < reassurance.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mx-2 text-teal-600"
                  >
                    ·
                  </span>
                )}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <picture>
            <source
              type="image/webp"
              media="(min-width: 1024px)"
              srcSet="/images/hero-1600.webp"
            />
            <source type="image/webp" srcSet="/images/hero-800.webp" />
            <source
              type="image/jpeg"
              media="(min-width: 1024px)"
              srcSet="/images/hero-1600.jpg"
            />
            <img
              src="/images/hero-800.jpg"
              alt={pick(lang, COPY.imageAlt)}
              width={1600}
              height={1067}
              loading="eager"
              fetchPriority="high"
              className="aspect-[3/2] w-full rounded-[2rem] object-cover shadow-xl shadow-navy-900/10"
            />
          </picture>
        </Reveal>
      </Container>
    </section>
  )
}
