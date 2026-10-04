import { Link } from 'react-router-dom'
import { House, MessageCircle } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { usePageMeta, pageTitle } from '../components/Seo'
import { Container, Section, Reveal, cn, buttonPrimary, buttonSecondary } from '../components/ui'

const COPY = {
  heading: { es: 'Página no encontrada', en: 'Page not found' },
  body: {
    es: 'La página que buscas no existe o ha cambiado de dirección. Puedes volver al inicio o ponerte en contacto con nosotros.',
    en: 'The page you are looking for does not exist or has moved. You can go back home or get in touch with us.',
  },
  home: { es: 'Volver al inicio', en: 'Back to home' },
  contact: { es: 'Ir a contacto', en: 'Go to contact' },
} as const

export default function NotFound() {
  const { lang } = useLanguage()
  usePageMeta({ title: pageTitle('404', lang), path: '*' })

  return (
    <Section aria-labelledby="notfound-heading" className="pt-24 sm:pt-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p
              className="font-display text-7xl font-bold text-navy-800/15 sm:text-8xl"
              aria-hidden="true"
            >
              404
            </p>
            <h1
              id="notfound-heading"
              className="mt-2 font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
            >
              {pick(lang, COPY.heading)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              {pick(lang, COPY.body)}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/" className={cn(buttonPrimary)}>
                <House className="h-5 w-5" aria-hidden="true" />
                {pick(lang, COPY.home)}
              </Link>
              <Link to="/contacto" className={cn(buttonSecondary)}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {pick(lang, COPY.contact)}
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
