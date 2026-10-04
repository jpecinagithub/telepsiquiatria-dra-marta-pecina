import { useEffect } from 'react'
import { practiceConfig } from '../config/practice'
import { useLanguage, type Lang } from '../i18n/LanguageContext'

const SITE_NAME: Record<Lang, string> = {
  en: 'Dr. Marta Peciña | Telepsychiatry Consultation',
  es: 'Dra. Marta Peciña | Consulta de Telepsiquiatría',
}

export function pageTitle(page: string, lang: Lang): string {
  return `${page} — ${SITE_NAME[lang]}`
}

export const DEFAULT_DESCRIPTION: Record<Lang, string> = {
  en: 'Information and contact for telepsychiatry consultations with Dr. Marta Peciña, MD, PhD.',
  es: 'Información y contacto para consulta de telepsiquiatría con la Dra. Marta Peciña, MD, PhD.',
}

/**
 * Per-page SEO: title, meta description, canonical + OG/Twitter tags
 * (only when siteUrl is configured), and document language.
 */
export function usePageMeta(opts: {
  title: string
  description?: string
  path: string
}) {
  const { lang } = useLanguage()

  useEffect(() => {
    document.title = opts.title
    document.documentElement.lang = lang

    const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(
        `meta[${attr}="${key}"]`,
      )
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, key)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    const description = opts.description ?? DEFAULT_DESCRIPTION[lang]
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', opts.title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', opts.title)
    setMeta('name', 'twitter:description', description)

    // Canonical + OG url only when the production URL is configured.
    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    )
    if (practiceConfig.siteUrl) {
      const url = `${practiceConfig.siteUrl}${opts.path}`
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.setAttribute('rel', 'canonical')
        document.head.appendChild(canonical)
      }
      canonical.setAttribute('href', url)
      setMeta('property', 'og:url', url)
      setMeta('property', 'og:image', `${practiceConfig.siteUrl}/logo.jpg`)
    } else if (canonical) {
      canonical.remove()
    }
  }, [opts.title, opts.description, opts.path, lang])
}

/** Inject JSON-LD structured data (verified claims only). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'json-ld-structured'
    script.textContent = JSON.stringify(data)
    const prev = document.getElementById('json-ld-structured')
    prev?.remove()
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [data])
  return null
}

/** Physician structured data — verified professional claims only. */
export function physicianJsonLd(lang: Lang): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: 'Dra. Marta Peciña',
    alternateName: 'Dr. Marta Peciña',
    description: DEFAULT_DESCRIPTION[lang],
    medicalSpecialty: 'Psychiatric',
    availableService: {
      '@type': 'MedicalProcedure',
      name:
        lang === 'es'
          ? 'Consulta de telepsiquiatría'
          : 'Telepsychiatry consultation',
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'University of Navarra' },
      { '@type': 'CollegeOrUniversity', name: 'University of Michigan' },
      { '@type': 'CollegeOrUniversity', name: 'University of Pittsburgh' },
    ],
  }
}
