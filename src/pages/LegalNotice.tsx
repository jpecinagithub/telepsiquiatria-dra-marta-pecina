import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { usePageMeta, pageTitle } from '../components/Seo'
import { Container, Section, Reveal } from '../components/ui'
import { practiceConfig } from '../config/practice'

const COPY = {
  title: { es: 'Aviso legal', en: 'Legal Notice' },
} as const

interface LegalSection {
  heading: Record<Lang, string>
  body: Record<Lang, string>
}

export default function LegalNotice() {
  const { lang } = useLanguage()
  usePageMeta({
    title: pageTitle(pick(lang, COPY.title), lang),
    path: '/aviso-legal',
  })

  const sections: LegalSection[] = [
    {
      heading: { es: 'Titularidad del sitio', en: 'Site ownership' },
      body: {
        es: practiceConfig.registrationNumber
          ? `Este sitio web pertenece a la Dra. Marta Peciña, psiquiatra. Nº de colegiada: ${practiceConfig.registrationNumber}.`
          : 'Este sitio web pertenece a la Dra. Marta Peciña, psiquiatra. Nº de colegiada: pendiente de publicación.',
        en: practiceConfig.registrationNumber
          ? `This website belongs to Dr. Marta Peciña, psychiatrist. Medical license number: ${practiceConfig.registrationNumber}.`
          : 'This website belongs to Dr. Marta Peciña, psychiatrist. Medical license number: pending publication.',
      },
    },
    {
      heading: { es: 'Objeto del sitio', en: 'Purpose of the site' },
      body: {
        es: 'Este sitio tiene una finalidad exclusivamente informativa. Su contenido no constituye consejo médico, diagnóstico ni tratamiento, y no sustituye la valoración profesional individual. Esta consulta no es un servicio de urgencias: ante una emergencia, en España llama al 112.',
        en: 'This site is for informational purposes only. Its content does not constitute medical advice, diagnosis or treatment, and does not replace individual professional assessment. This practice is not an emergency service: in an emergency, in Spain call 112.',
      },
    },
    {
      heading: {
        es: 'Relación médico-paciente',
        en: 'Doctor–patient relationship',
      },
      body: {
        es: 'El uso de este sitio web, el envío del formulario de contacto o el intercambio de mensajes no crean por sí mismos una relación médico-paciente. Dicha relación se establece únicamente durante la atención clínica.',
        en: 'Using this website, submitting the contact form or exchanging messages does not by itself create a doctor–patient relationship. That relationship is established only during clinical care.',
      },
    },
    {
      heading: { es: 'Propiedad intelectual', en: 'Intellectual property' },
      body: {
        es: 'Los contenidos de este sitio —textos, imágenes y diseño— están protegidos y no pueden reproducirse sin autorización expresa.',
        en: 'The contents of this site —text, images and design— are protected and may not be reproduced without express authorization.',
      },
    },
    {
      heading: { es: 'Enlaces externos', en: 'External links' },
      body: {
        es: 'Este sitio puede incluir enlaces a páginas de terceros. La titular no se responsabiliza de los contenidos ni de las políticas de privacidad de dichos sitios.',
        en: 'This site may include links to third-party pages. The owner is not responsible for the contents or privacy policies of those sites.',
      },
    },
    {
      heading: { es: 'Responsabilidad', en: 'Liability' },
      body: {
        es: 'Se procura que la información publicada sea exacta y esté actualizada, pero no se garantiza la ausencia de errores ni la disponibilidad continua del sitio.',
        en: 'Reasonable care is taken to keep the published information accurate and up to date, but the absence of errors or the continuous availability of the site cannot be guaranteed.',
      },
    },
  ]

  return (
    <Section aria-labelledby="legal-heading" className="pt-20 sm:pt-24">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h1
              id="legal-heading"
              className="font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
            >
              {pick(lang, COPY.title)}
            </h1>
          </Reveal>
          <div className="mt-10 space-y-8">
            {sections.map((s, i) => (
              <Reveal key={s.heading.en} delay={i * 0.03}>
                <section aria-labelledby={`legal-s-${i}`}>
                  <h2
                    id={`legal-s-${i}`}
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
