/**
 * Central practice configuration.
 *
 * Every field that is not yet verified is an empty string / empty array.
 * Components MUST hide UI for empty values — never render placeholders
 * and never invent prices, durations, languages or registration numbers.
 */
export const practiceConfig = {
  doctorName: 'Dra. Marta Peciña',
  credentials: 'MD, PhD',

  /** WhatsApp Business number, digits only (country code + number). Supplied by the practice. */
  whatsapp: '34711299479',

  /** Business email — hidden until supplied. */
  email: '',

  /** Production URL used for canonical/OG tags and sitemap. Hidden until supplied. */
  siteUrl: '',

  /** Unknown business details — hidden until supplied by the practice. */
  consultationDuration: '',
  firstConsultationPrice: '',
  followUpPrice: '',
  languages: [] as string[],
  licensedTerritories: [] as string[],
  registrationNumber: '', // Nº de colegiada
  sanitarioRegistration: '', // Registro sanitario

  /** External professional profile — hidden until supplied. Never guessed. */
  linkedInUrl: '',
} as const

export type PracticeConfig = typeof practiceConfig
