import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { usePageMeta, pageTitle } from '../components/Seo'
import { Container, Section, Reveal } from '../components/ui'

const COPY: {
  title: Record<Lang, string>
  p1: Record<Lang, string>
  p2: Record<Lang, string>
  p3: Record<Lang, string>
  listHeading: Record<Lang, string>
  items: Record<Lang, string[]>
  closing: Record<Lang, string>
} = {
  title: { es: 'Política de cookies', en: 'Cookie Policy' },
  p1: {
    es: 'Este sitio no utiliza cookies no esenciales. No mostramos ningún aviso de cookies porque no hay ninguna que requiera tu consentimiento.',
    en: 'This site does not use non-essential cookies. We show no cookie banner because there are no cookies that require your consent.',
  },
  p2: {
    es: 'La herramienta de analítica web utilizada (Vercel Web Analytics) es respetuosa con la privacidad y no emplea cookies: mide visitas de forma agregada, sin identificar a las personas.',
    en: 'The web analytics tool used (Vercel Web Analytics) is privacy-friendly and cookie-less: it measures visits in aggregate, without identifying individuals.',
  },
  p3: {
    es: 'Tu elección de idioma no se guarda en el navegador: al recargar la página, el sitio vuelve al idioma por defecto.',
    en: 'Your language choice is not stored in the browser: when the page is reloaded, the site returns to the default language.',
  },
  listHeading: {
    es: 'Lo que requeriría tu consentimiento — y no usamos',
    en: 'What would require your consent — and we do not use',
  },
  items: {
    es: [
      'Cookies de publicidad o seguimiento de terceros.',
      'Cookies de personalización que recuerden tus preferencias.',
      'Identificadores persistentes entre visitas.',
    ],
    en: [
      'Advertising or third-party tracking cookies.',
      'Personalization cookies that remember your preferences.',
      'Persistent identifiers across visits.',
    ],
  },
  closing: {
    es: 'Si en el futuro el sitio necesitara alguna cookie, se te informará y se pedirá tu consentimiento antes de utilizarla.',
    en: 'If the site ever needs a cookie in the future, you will be informed and your consent will be requested before it is used.',
  },
} 

export default function Cookies() {
  const { lang } = useLanguage()
  usePageMeta({
    title: pageTitle(pick(lang, COPY.title), lang),
    path: '/cookies',
  })

  return (
    <Section aria-labelledby="cookies-heading" className="pt-20 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1
              id="cookies-heading"
              className="font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
            >
              {pick(lang, COPY.title)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              {pick(lang, COPY.p1)}
            </p>
            <p className="mt-4 leading-relaxed text-ink-500">
              {pick(lang, COPY.p2)}
            </p>
            <p className="mt-4 leading-relaxed text-ink-500">
              {pick(lang, COPY.p3)}
            </p>
            <h2 className="mt-10 font-display text-xl font-semibold text-navy-900">
              {pick(lang, COPY.listHeading)}
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-500">
              {pick(lang, COPY.items).map((item) => (
                <li key={item} className="leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 leading-relaxed text-ink-500">
              {pick(lang, COPY.closing)}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
