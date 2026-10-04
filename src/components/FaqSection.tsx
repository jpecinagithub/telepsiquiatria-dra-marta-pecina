import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { Container, Section, SectionHeading, Reveal, cn, buttonSecondary } from './ui'
import { FAQ_ITEMS } from '../data/faq'

const COPY: Record<string, Record<Lang, string>> = {
  eyebrow: { es: 'Dudas habituales', en: 'Common questions' },
  title: { es: 'Preguntas frecuentes', en: 'Frequently asked questions' },
  seeAll: { es: 'Ver todas las preguntas', en: 'See all questions' },
}

export function FaqSection() {
  const { lang } = useLanguage()
  const [open, setOpen] = useState<string | null>(null)
  const items = FAQ_ITEMS.slice(0, 6)

  return (
    <Section labelledBy="faq-heading" className="bg-white">
      <Container>
        <Reveal>
          <SectionHeading
            id="faq-heading"
            eyebrow={pick(lang, COPY.eyebrow)}
            title={pick(lang, COPY.title)}
          />
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <div className="border-t border-mist-200">
            {items.map((item) => {
              const isOpen = open === item.id
              return (
                <div key={item.id} className="border-b border-mist-200">
                  <h3>
                    <button
                      type="button"
                      id={`${item.id}-button`}
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-panel`}
                      onClick={() => setOpen(isOpen ? null : item.id)}
                      className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="text-base font-semibold text-navy-900">
                        {pick(lang, item.q)}
                      </span>
                      <ChevronDown
                        className={cn(
                          'h-5 w-5 shrink-0 text-teal-700 transition-transform',
                          isOpen && 'rotate-180',
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`${item.id}-panel`}
                    role="region"
                    aria-labelledby={`${item.id}-button`}
                    hidden={!isOpen}
                  >
                    <p className="pb-6 pr-2 text-[15px] leading-relaxed text-ink-500 sm:pr-10">
                      {pick(lang, item.a)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Reveal>

        <Reveal className="mt-8 text-center">
          <Link to="/preguntas-frecuentes" className={buttonSecondary}>
            {pick(lang, COPY.seeAll)}
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </Section>
  )
}
