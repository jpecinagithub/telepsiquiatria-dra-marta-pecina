import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { usePageMeta, pageTitle } from '../components/Seo'
import { Container, Section, Reveal } from '../components/ui'

const COPY = {
  title: { es: 'Política de privacidad', en: 'Privacy Policy' },
  intro: {
    es: 'Esta política explica cómo se tratan los datos personales que compartes al ponerte en contacto con esta consulta.',
    en: 'This policy explains how the personal data you share when contacting this practice is handled.',
  },
  updated: {
    es: 'Última actualización: octubre de 2026',
    en: 'Last updated: October 2026',
  },
} as const

interface PrivacySection {
  heading: Record<Lang, string>
  body: Record<Lang, string>
}

const SECTIONS: PrivacySection[] = [
  {
    heading: { es: 'Responsable del tratamiento', en: 'Data controller' },
    body: {
      es: 'Responsable: Dra. Marta Peciña — [datos de contacto pendientes de publicación].',
      en: 'Controller: Dr. Marta Peciña — [contact details pending publication].',
    },
  },
  {
    heading: { es: 'Datos que se recogen', en: 'Data collected' },
    body: {
      es: 'Únicamente los datos que tú decides compartir en el formulario de contacto o por WhatsApp: tu nombre, la forma de contacto que indiques y el contenido de tu mensaje. No se recogen otros datos.',
      en: 'Only the data you choose to share in the contact form or via WhatsApp: your name, the contact method you provide, and the content of your message. No other data is collected.',
    },
  },
  {
    heading: { es: 'Finalidad del tratamiento', en: 'Purpose of processing' },
    body: {
      es: 'Los datos se utilizan exclusivamente para responder a tu solicitud de información o de consulta e indicarte los siguientes pasos.',
      en: 'The data is used exclusively to respond to your request for information or consultation and to indicate the next steps.',
    },
  },
  {
    heading: { es: 'Base jurídica', en: 'Legal basis' },
    body: {
      es: 'La base jurídica del tratamiento es tu consentimiento, que otorgas al enviar el formulario o iniciar el contacto.',
      en: 'The legal basis for processing is your consent, which you give by submitting the form or initiating contact.',
    },
  },
  {
    heading: { es: 'Conservación de los datos', en: 'Data retention' },
    body: {
      es: 'Los datos se conservan únicamente durante el tiempo necesario para responder a tu solicitud. No se almacenan datos clínicos en el navegador.',
      en: 'Data is kept only for as long as necessary to respond to your request. No clinical data is stored in the browser.',
    },
  },
  {
    heading: { es: 'Tus derechos', en: 'Your rights' },
    body: {
      es: 'Tienes derecho a acceder a tus datos, rectificarlos, suprimirlos, oponerte a su tratamiento, limitarlo o solicitar su portabilidad. Para ejercer tus derechos puedes escribir a la dirección de contacto de la consulta cuando esté publicada.',
      en: 'You have the right to access, rectify, erase, object to, restrict or request the portability of your data. To exercise your rights, you may write to the practice\u2019s contact address once it is published.',
    },
  },
  {
    heading: { es: 'Sin suscripciones ni marketing', en: 'No subscriptions or marketing' },
    body: {
      es: 'Este sitio no incluye suscripciones a boletines ni envíos de comunicaciones comerciales. Tus datos no se ceden a terceros con fines de marketing.',
      en: 'This site includes no newsletter subscriptions and sends no marketing communications. Your data is not shared with third parties for marketing purposes.',
    },
  },
]

export default function Privacy() {
  const { lang } = useLanguage()
  usePageMeta({
    title: pageTitle(pick(lang, COPY.title), lang),
    path: '/privacidad',
  })

  return (
    <Section aria-labelledby="privacy-heading" className="pt-20 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1
              id="privacy-heading"
              className="font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
            >
              {pick(lang, COPY.title)}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-500">
              {pick(lang, COPY.intro)}
            </p>
            <p className="mt-3 text-sm text-ink-500">
              {pick(lang, COPY.updated)}
            </p>
          </Reveal>
          <div className="mt-10 space-y-8">
            {SECTIONS.map((s, i) => (
              <Reveal key={s.heading.en} delay={i * 0.03}>
                <section aria-labelledby={`privacy-s-${i}`}>
                  <h2
                    id={`privacy-s-${i}`}
                    className="font-display text-xl font-semibold text-navy-900"
                  >
                    {pick(lang, s.heading)}
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-500">
                    {pick(lang, s.body)}
                  </p>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
