import {
  Video,
  House,
  CalendarClock,
  Lock,
  HandHeart,
  MonitorSmartphone,
  Wifi,
  DoorClosed,
  MessageCircle,
} from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from '../components/WhatsAppProvider'
import { usePageMeta, pageTitle } from '../components/Seo'
import { EmergencyNotice } from '../components/EmergencyNotice'
import {
  Container,
  Section,
  SectionHeading,
  Reveal,
  buttonPrimary,
} from '../components/ui'

const COPY = {
  title: { es: 'Telepsiquiatría', en: 'Telepsychiatry' },
  introEyebrow: { es: 'Atención a distancia', en: 'Remote care' },
  whatTitle: { es: '¿Qué es la telepsiquiatría?', en: 'What is telepsychiatry?' },
  whatP1: {
    es: 'La telepsiquiatría es la consulta psiquiátrica realizada por videollamada, con el mismo rigor médico y la misma confidencialidad que una consulta presencial.',
    en: 'Telepsychiatry is psychiatric consultation by video call, with the same medical rigor and the same confidentiality as an in-person visit.',
  },
  whatP2: {
    es: 'Permite la valoración inicial, el seguimiento del tratamiento y la revisión de la evolución sin que tengas que desplazarte. La relación terapéutica se construye igualmente a través de la pantalla, con una comunicación cercana y directa.',
    en: 'It allows the initial assessment, treatment follow-up and review of progress without the need to travel. The therapeutic relationship is built just the same through the screen, with close, direct communication.',
  },
  whatP3: {
    es: 'La sesión se realiza en tiempo real, con la doctora y la persona paciente viéndose y escuchándose como en una consulta habitual.',
    en: 'The session takes place in real time, with the doctor and the patient seeing and hearing each other as in a regular consultation.',
  },
  benefitsEyebrow: { es: 'Ventajas', en: 'Benefits' },
  benefitsTitle: { es: 'Por qué funciona la consulta online', en: 'Why the online consultation works' },
  needsEyebrow: { es: 'Requisitos sencillos', en: 'Simple requirements' },
  needsTitle: { es: '¿Qué necesito?', en: 'What do I need?' },
  needsDeviceTitle: {
    es: 'Un dispositivo con cámara y micrófono',
    en: 'A device with camera and microphone',
  },
  needsDeviceBody: {
    es: 'Ordenador, tableta o teléfono móvil. No hace falta instalar programas complicados.',
    en: 'A computer, tablet or mobile phone. No complicated software installation is needed.',
  },
  needsConnectionTitle: {
    es: 'Una conexión a internet estable',
    en: 'A stable internet connection',
  },
  needsConnectionBody: {
    es: 'Para que la videollamada sea fluida y la conversación no se interrumpa.',
    en: 'So the video call runs smoothly and the conversation is not interrupted.',
  },
  needsSpaceTitle: {
    es: 'Un espacio privado y tranquilo',
    en: 'A private, quiet space',
  },
  needsSpaceBody: {
    es: 'Un lugar donde puedas hablar con libertad y nadie te interrumpa. Tu privacidad es esencial: la consulta se desarrolla en un entorno seguro y confidencial.',
    en: 'A place where you can speak freely and no one will interrupt you. Your privacy is essential: the consultation takes place in a secure, confidential setting.',
  },
  suitabilityEyebrow: { es: 'Indicación clínica', en: 'Clinical suitability' },
  suitabilityTitle: {
    es: '¿Es adecuada para mi situación?',
    en: 'Is it right for my situation?',
  },
  suitabilityStatement: {
    es: 'No todas las situaciones clínicas son adecuadas para la teleconsulta.',
    en: 'Not all clinical situations are suitable for remote consultation.',
  },
  suitabilityBody: {
    es: 'En la primera toma de contacto valoramos si la teleconsulta es adecuada para tu situación.',
    en: 'At the first point of contact, we assess whether the remote consultation is appropriate for your situation.',
  },
  ctaLabel: {
    es: 'Consultar si mi caso puede atenderse online',
    en: 'Ask whether my situation can be handled online',
  },
  waMessage: {
    es: 'Hola, me gustaría consultar si mi caso puede atenderse por telepsiquiatría.',
    en: 'Hello, I would like to ask whether my situation can be handled through telepsychiatry.',
  },
  imageAlt: {
    es: 'Videollamada de telepsiquiatría en un entorno tranquilo',
    en: 'Telepsychiatry video call in a calm setting',
  },
} as const

const BENEFITS: Array<{
  icon: typeof Video
  title: Record<Lang, string>
  body: Record<Lang, string>
}> = [
  {
    icon: House,
    title: { es: 'Sin desplazamientos', en: 'No travel needed' },
    body: {
      es: 'Consulta desde casa o desde donde estés, sin tiempo perdido en traslados.',
      en: 'Consult from home or wherever you are, with no time lost on travel.',
    },
  },
  {
    icon: Video,
    title: { es: 'Cara a cara, en tiempo real', en: 'Face to face, in real time' },
    body: {
      es: 'Ves y escuchas a la doctora como en una consulta habitual.',
      en: 'You see and hear the doctor as in a regular consultation.',
    },
  },
  {
    icon: CalendarClock,
    title: { es: 'Horarios más flexibles', en: 'More flexible scheduling' },
    body: {
      es: 'Es más fácil encontrar un hueco que se ajuste a tu día a día.',
      en: 'It is easier to find a slot that fits your daily life.',
    },
  },
  {
    icon: Lock,
    title: {
      es: 'La misma confidencialidad',
      en: 'The same confidentiality',
    },
    body: {
      es: 'El secreto médico y la privacidad protegen la consulta igual que en persona.',
      en: 'Medical confidentiality and privacy protect the consultation just as in person.',
    },
  },
  {
    icon: HandHeart,
    title: { es: 'Continuidad del seguimiento', en: 'Continuity of follow-up' },
    body: {
      es: 'El tratamiento puede revisarse de forma regular, estés donde estés.',
      en: 'Treatment can be reviewed regularly, wherever you are.',
    },
  },
]

const NEEDS: Array<{
  icon: typeof MonitorSmartphone
  title: Record<Lang, string>
  body: Record<Lang, string>
}> = [
  {
    icon: MonitorSmartphone,
    title: COPY.needsDeviceTitle,
    body: COPY.needsDeviceBody,
  },
  {
    icon: Wifi,
    title: COPY.needsConnectionTitle,
    body: COPY.needsConnectionBody,
  },
  {
    icon: DoorClosed,
    title: COPY.needsSpaceTitle,
    body: COPY.needsSpaceBody,
  },
]

export default function Telepsychiatry() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()
  usePageMeta({
    title: pageTitle(pick(lang, COPY.title), lang),
    path: '/telepsiquiatria',
  })

  return (
    <>
      <Section aria-labelledby="tele-heading" className="pt-20 sm:pt-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                {pick(lang, COPY.introEyebrow)}
              </p>
              <h1
                id="tele-heading"
                className="mt-3 font-display text-4xl sm:text-5xl leading-tight text-navy-900 text-balance"
              >
                {pick(lang, COPY.title)}
              </h1>
              <h2 className="mt-8 font-display text-2xl text-navy-900">
                {pick(lang, COPY.whatTitle)}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-500">
                {pick(lang, COPY.whatP1)}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-ink-500">
                {pick(lang, COPY.whatP2)}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-ink-500">
                {pick(lang, COPY.whatP3)}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <picture>
                <source
                  srcSet="/images/tele-1200.webp"
                  media="(min-width: 1024px)"
                  type="image/webp"
                />
                <source srcSet="/images/tele-800.webp" type="image/webp" />
                <img
                  src="/images/tele-1200.jpg"
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
        aria-labelledby="benefits-heading"
        className="bg-mist-100/60"
      >
        <Container>
          <SectionHeading
            id="benefits-heading"
            eyebrow={pick(lang, COPY.benefitsEyebrow)}
            title={pick(lang, COPY.benefitsTitle)}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title.en} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-navy-800/10 bg-white/80 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700/10 text-teal-700">
                    <b.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                    {pick(lang, b.title)}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    {pick(lang, b.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="needs-heading">
        <Container>
          <SectionHeading
            id="needs-heading"
            eyebrow={pick(lang, COPY.needsEyebrow)}
            title={pick(lang, COPY.needsTitle)}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {NEEDS.map((n, i) => (
              <Reveal key={n.title.en} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-navy-800/10 bg-white/80 p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-800/10 text-navy-800">
                    <n.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                    {pick(lang, n.title)}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-500">
                    {pick(lang, n.body)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        aria-labelledby="suitability-heading"
        className="bg-sand-100/60"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal-700">
                {pick(lang, COPY.suitabilityEyebrow)}
              </p>
              <h2
                id="suitability-heading"
                className="mt-3 font-display text-3xl sm:text-4xl leading-tight text-navy-900 text-balance"
              >
                {pick(lang, COPY.suitabilityTitle)}
              </h2>
              <p className="mt-6 text-lg font-semibold text-navy-900">
                {pick(lang, COPY.suitabilityStatement)}
              </p>
              <p className="mt-3 text-lg leading-relaxed text-ink-500">
                {pick(lang, COPY.suitabilityBody)}
              </p>
              <button
                type="button"
                onClick={() => requestWhatsApp(pick(lang, COPY.waMessage))}
                className={buttonPrimary + ' mt-8'}
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                {pick(lang, COPY.ctaLabel)}
              </button>
            </Reveal>
          </div>
        </Container>
      </Section>

      <EmergencyNotice />
    </>
  )
}
