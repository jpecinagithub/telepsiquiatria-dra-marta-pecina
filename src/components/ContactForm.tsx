import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import { cn, buttonPrimary, buttonSecondary } from './ui'

type Channel = 'whatsapp' | 'phone' | 'email'
type FieldKey = 'nombre' | 'email' | 'telefono' | 'pais' | 'motivo' | 'consent'

const COPY: Record<string, Record<Lang, string>> = {
  intro: {
    es: 'Los campos marcados con * son obligatorios.',
    en: 'Fields marked * are required.',
  },
  nombreLabel: { es: 'Nombre', en: 'First name' },
  apellidosLabel: { es: 'Apellidos', en: 'Surname' },
  optional: { es: 'opcional', en: 'optional' },
  emailLabel: { es: 'Correo electrónico', en: 'Email' },
  telefonoLabel: { es: 'Teléfono', en: 'Phone' },
  paisLabel: { es: 'País de residencia', en: 'Country of residence' },
  canalLabel: { es: '¿Cómo prefieres que te contactemos?', en: 'How would you prefer to be contacted?' },
  motivoLabel: { es: 'Motivo de la solicitud', en: 'Reason for the request' },
  motivoPlaceholder: { es: 'Selecciona un motivo', en: 'Select a reason' },
  mensajeLabel: {
    es: 'Puedes añadir información práctica si lo deseas. Por tu privacidad, evita incluir aquí información clínica sensible.',
    en: 'You may add practical information if you wish. For your privacy, please avoid including sensitive clinical information here.',
  },
  consentLabelStart: {
    es: 'He leído la',
    en: 'I have read the',
  },
  privacyPolicy: {
    es: 'política de privacidad',
    en: 'privacy policy',
  },
  consentLabelEnd: {
    es: 'y autorizo el uso de mis datos para responder a esta solicitud.',
    en: 'and I consent to the use of my data to respond to this request.',
  },
  submit: { es: 'Enviar solicitud', en: 'Send request' },
  required: { es: 'Este campo es obligatorio.', en: 'This field is required.' },
  emailInvalid: {
    es: 'Introduce una dirección de correo válida.',
    en: 'Enter a valid email address.',
  },
  phoneInvalid: {
    es: 'Introduce un número de teléfono válido.',
    en: 'Enter a valid phone number.',
  },
  tooFast: {
    es: 'Por favor, espera unos segundos antes de intentarlo de nuevo.',
    en: 'Please wait a few seconds before trying again.',
  },
  privacyNote: {
    es: 'Tus datos solo se usarían para responder a tu solicitud. No se almacenan en este dispositivo.',
    en: 'Your data would only be used to respond to your request. It is not stored on this device.',
  },
  received: {
    es: 'Hemos recibido tu solicitud.',
    en: 'We have received your request.',
  },
  noBackendNote: {
    es: 'Este sitio web no almacena tu solicitud. Para continuar, puedes enviar tu solicitud directamente por WhatsApp:',
    en: 'This website does not store your request. To continue, you can send your request directly via WhatsApp:',
  },
  continueWa: { es: 'Continuar por WhatsApp', en: 'Continue via WhatsApp' },
  backToForm: { es: 'Volver al formulario', en: 'Back to the form' },
}

const CHANNELS: { value: Channel; label: Record<Lang, string> }[] = [
  { value: 'whatsapp', label: { es: 'WhatsApp', en: 'WhatsApp' } },
  { value: 'phone', label: { es: 'Teléfono', en: 'Phone' } },
  { value: 'email', label: { es: 'Correo electrónico', en: 'Email' } },
]

/** Channel wording used inside the composed WhatsApp message. */
const CHANNEL_MESSAGE_LABEL: Record<Channel, Record<Lang, string>> = {
  whatsapp: { es: 'WhatsApp', en: 'WhatsApp' },
  phone: { es: 'teléfono', en: 'phone' },
  email: { es: 'correo electrónico', en: 'email' },
}

const MOTIVOS: { value: string; label: Record<Lang, string> }[] = [
  { value: 'primera', label: { es: 'Primera consulta', en: 'Initial consultation' } },
  { value: 'info', label: { es: 'Información sobre teleconsulta', en: 'Teleconsultation information' } },
  { value: 'segunda', label: { es: 'Segunda opinión', en: 'Second opinion' } },
  { value: 'seguimiento', label: { es: 'Seguimiento', en: 'Follow-up' } },
  { value: 'otra', label: { es: 'Otra consulta', en: 'Other enquiry' } },
]

const COUNTRIES = [
  'España',
  'México',
  'Argentina',
  'Colombia',
  'Perú',
  'Chile',
  'Estados Unidos',
  'Reino Unido',
  'Francia',
  'Alemania',
  'Italia',
  'Portugal',
  'Países Bajos',
  'Bélgica',
  'Suiza',
  'Irlanda',
  'Andorra',
  'Uruguay',
  'Ecuador',
  'Venezuela',
  'Brasil',
  'Paraguay',
  'Bolivia',
  'Cuba',
  'República Dominicana',
  'Costa Rica',
  'Canadá',
]

const FIELD_ORDER: FieldKey[] = ['nombre', 'email', 'telefono', 'pais', 'motivo', 'consent']

const inputCls =
  'w-full rounded-xl border border-mist-200 bg-white px-4 py-3 text-base text-ink-900 placeholder:text-ink-400 transition-colors focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-600/30'
const inputErrorCls = 'border-red-600 focus:border-red-600 focus:ring-red-600/20'

function describedBy(
  id: string,
  parts: { error?: string; hint?: string },
): string | undefined {
  const ids: string[] = []
  if (parts.hint) ids.push(`${id}-hint`)
  if (parts.error) ids.push(`${id}-error`)
  return ids.length ? ids.join(' ') : undefined
}

function FormField({
  id,
  label,
  children,
  error,
  hint,
  optional,
}: {
  id: string
  label: string
  children: ReactNode
  error?: string
  hint?: string
  optional?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold text-ink-900"
      >
        {label}{' '}
        <span aria-hidden="true" className="text-teal-700">
          *
        </span>
        {optional && (
          <span className="font-normal text-ink-400"> ({optional})</span>
        )}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="mb-1.5 text-sm text-ink-500">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export function ContactForm() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  const [nombre, setNombre] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [pais, setPais] = useState('')
  const [canal, setCanal] = useState<Channel>('whatsapp')
  const [motivo, setMotivo] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [website, setWebsite] = useState('') // honeypot
  const [consent, setConsent] = useState(false)

  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [notice, setNotice] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [isBot, setIsBot] = useState(false)
  const lastSubmit = useRef(0)

  const optionalText = pick(lang, COPY.optional)

  function validate(): Partial<Record<FieldKey, string>> {
    const errs: Partial<Record<FieldKey, string>> = {}
    if (!nombre.trim()) errs.nombre = pick(lang, COPY.required)
    if (!email.trim()) errs.email = pick(lang, COPY.required)
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      errs.email = pick(lang, COPY.emailInvalid)
    if (!telefono.trim()) errs.telefono = pick(lang, COPY.required)
    else if (!/^[+()\-\s.\d]{6,}$/.test(telefono.trim()))
      errs.telefono = pick(lang, COPY.phoneInvalid)
    if (!pais.trim()) errs.pais = pick(lang, COPY.required)
    if (!motivo) errs.motivo = pick(lang, COPY.required)
    if (!consent) errs.consent = pick(lang, COPY.required)
    setErrors(errs)
    return errs
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Honeypot: pretend success for automated submissions.
    if (website) {
      setIsBot(true)
      setSubmitted(true)
      return
    }
    const now = Date.now()
    if (now - lastSubmit.current < 10_000) {
      setNotice(pick(lang, COPY.tooFast))
      return
    }
    lastSubmit.current = now
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setNotice(null)
      const first = FIELD_ORDER.find((k) => errs[k])
      if (first) document.getElementById(`cf-${first}`)?.focus()
      return
    }
    setNotice(null)
    setSubmitted(true)
  }

  function reset() {
    setNombre('')
    setApellidos('')
    setEmail('')
    setTelefono('')
    setPais('')
    setCanal('whatsapp')
    setMotivo('')
    setMensaje('')
    setWebsite('')
    setConsent(false)
    setErrors({})
    setNotice(null)
    setSubmitted(false)
    setIsBot(false)
  }

  if (submitted) {
    const motivoLabel =
      MOTIVOS.find((m) => m.value === motivo)?.label[lang] ?? ''
    const channelLabel = pick(lang, CHANNEL_MESSAGE_LABEL[canal])
    const composedMessage =
      lang === 'es'
        ? `Hola, soy ${nombre.trim()}. He completado el formulario de primer contacto (${motivoLabel}). Prefiero que me contacten por ${channelLabel}.`
        : `Hello, I am ${nombre.trim()}. I have completed the first-contact form (${motivoLabel}). I would prefer to be contacted by ${channelLabel}.`

    return (
      <div
        role="status"
        className="rounded-[1.75rem] border border-mist-200 bg-white p-8 text-center sm:p-12"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-teal-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 font-display text-2xl text-navy-900 sm:text-3xl">
          {pick(lang, COPY.received)}
        </h2>
        {!isBot && (
          <>
            <p className="mx-auto mt-4 max-w-md leading-relaxed text-ink-500">
              {pick(lang, COPY.noBackendNote)}
            </p>
            <button
              type="button"
              onClick={() => requestWhatsApp(composedMessage)}
              className={cn(buttonPrimary, 'mt-6')}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {pick(lang, COPY.continueWa)}
            </button>
          </>
        )}
        <div className={isBot ? 'mt-6' : 'mt-3'}>
          <button
            type="button"
            onClick={reset}
            className={cn(buttonSecondary, 'px-5 py-2 text-sm')}
          >
            {pick(lang, COPY.backToForm)}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-6 text-sm text-ink-500">{pick(lang, COPY.intro)}</p>

      {notice && (
        <p
          role="status"
          className="mb-6 rounded-xl border border-sand-200 bg-sand-100 px-4 py-3 text-sm text-ink-700"
        >
          {notice}
        </p>
      )}

      <form noValidate onSubmit={onSubmit} className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="cf-nombre"
            label={pick(lang, COPY.nombreLabel)}
            error={errors.nombre}
          >
            <input
              id="cf-nombre"
              name="nombre"
              type="text"
              autoComplete="given-name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              aria-invalid={errors.nombre ? true : undefined}
              aria-describedby={describedBy('cf-nombre', {
                error: errors.nombre,
              })}
              className={cn(inputCls, errors.nombre && inputErrorCls)}
            />
          </FormField>

          <div>
            <label
              htmlFor="cf-apellidos"
              className="mb-1.5 block text-sm font-semibold text-ink-900"
            >
              {pick(lang, COPY.apellidosLabel)}{' '}
              <span className="font-normal text-ink-400">
                ({optionalText})
              </span>
            </label>
            <input
              id="cf-apellidos"
              name="apellidos"
              type="text"
              autoComplete="family-name"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className={inputCls}
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            id="cf-email"
            label={pick(lang, COPY.emailLabel)}
            error={errors.email}
          >
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy('cf-email', {
                error: errors.email,
              })}
              className={cn(inputCls, errors.email && inputErrorCls)}
            />
          </FormField>

          <FormField
            id="cf-telefono"
            label={pick(lang, COPY.telefonoLabel)}
            error={errors.telefono}
          >
            <input
              id="cf-telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              aria-invalid={errors.telefono ? true : undefined}
              aria-describedby={describedBy('cf-telefono', {
                error: errors.telefono,
              })}
              className={cn(inputCls, errors.telefono && inputErrorCls)}
            />
          </FormField>
        </div>

        <FormField
          id="cf-pais"
          label={pick(lang, COPY.paisLabel)}
          error={errors.pais}
        >
          <input
            id="cf-pais"
            name="pais"
            type="text"
            autoComplete="country-name"
            list="cf-paises-list"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            aria-invalid={errors.pais ? true : undefined}
            aria-describedby={describedBy('cf-pais', {
              error: errors.pais,
            })}
            className={cn(inputCls, errors.pais && inputErrorCls)}
          />
          <datalist id="cf-paises-list">
            {COUNTRIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </FormField>

        <fieldset>
          <legend className="mb-2 block text-sm font-semibold text-ink-900">
            {pick(lang, COPY.canalLabel)}{' '}
            <span aria-hidden="true" className="text-teal-700">
              *
            </span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map((c) => (
              <label
                key={c.value}
                className={cn(
                  'inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[15px] font-medium transition-colors',
                  canal === c.value
                    ? 'border-navy-800 bg-navy-800 text-white'
                    : 'border-mist-200 bg-white text-ink-700 hover:border-navy-800/50',
                )}
              >
                <input
                  type="radio"
                  name="canal"
                  value={c.value}
                  checked={canal === c.value}
                  onChange={() => setCanal(c.value)}
                  className="h-4 w-4 accent-teal-700"
                />
                {pick(lang, c.label)}
              </label>
            ))}
          </div>
        </fieldset>

        <FormField
          id="cf-motivo"
          label={pick(lang, COPY.motivoLabel)}
          error={errors.motivo}
        >
          <select
            id="cf-motivo"
            name="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            aria-invalid={errors.motivo ? true : undefined}
            aria-describedby={describedBy('cf-motivo', {
              error: errors.motivo,
            })}
            className={cn(inputCls, errors.motivo && inputErrorCls)}
          >
            <option value="">{pick(lang, COPY.motivoPlaceholder)}</option>
            {MOTIVOS.map((m) => (
              <option key={m.value} value={m.value}>
                {pick(lang, m.label)}
              </option>
            ))}
          </select>
        </FormField>

        <div>
          <label
            htmlFor="cf-mensaje"
            className="mb-1.5 block text-sm font-semibold text-ink-900"
          >
            {pick(lang, COPY.mensajeLabel)}{' '}
            <span className="font-normal text-ink-400">
              ({optionalText})
            </span>
          </label>
          <textarea
            id="cf-mensaje"
            name="mensaje"
            rows={4}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className={cn(inputCls, 'resize-y')}
          />
        </div>

        {/* Honeypot — invisible to humans; bots that fill it get a fake success. */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="cf-website">
            Website
            <input
              id="cf-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>

        <div>
          <div className="flex items-start gap-3">
            <input
              id="cf-consent"
              name="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={
                errors.consent ? 'cf-consent-error' : undefined
              }
              className="mt-1 h-5 w-5 shrink-0 rounded accent-teal-700"
            />
            <label
              htmlFor="cf-consent"
              className="text-[15px] leading-relaxed text-ink-700"
            >
              {pick(lang, COPY.consentLabelStart)}{' '}
              <Link
                to="/privacidad"
                className="font-semibold text-navy-800 underline decoration-teal-600 decoration-2 underline-offset-2"
              >
                {pick(lang, COPY.privacyPolicy)}
              </Link>{' '}
              {pick(lang, COPY.consentLabelEnd)}{' '}
              <span aria-hidden="true" className="text-teal-700">
                *
              </span>
            </label>
          </div>
          {errors.consent && (
            <p id="cf-consent-error" className="mt-1.5 text-sm text-red-700">
              {errors.consent}
            </p>
          )}
        </div>

        <div>
          <button type="submit" className={buttonPrimary}>
            {pick(lang, COPY.submit)}
          </button>
        </div>
      </form>

      <p className="mt-6 flex items-start gap-2 text-sm leading-relaxed text-ink-500">
        <ShieldCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-teal-700"
          aria-hidden="true"
        />
        <span>{pick(lang, COPY.privacyNote)}</span>
      </p>
    </div>
  )
}
