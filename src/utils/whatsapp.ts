import { practiceConfig } from '../config/practice'
import type { Lang } from '../i18n/LanguageContext'

export const WHATSAPP_NUMBER = practiceConfig.whatsapp
export const WHATSAPP_DISPLAY = '+34 711 29 94 79'

/** Default pre-filled first-contact message, localized. */
export const WHATSAPP_DEFAULT_MESSAGE: Record<Lang, string> = {
  es: 'Hola, me gustaría solicitar información sobre una primera consulta de telepsiquiatría con la Dra. Marta Peciña.',
  en: 'Hello, I would like to request information about an initial telepsychiatry consultation with Dr. Marta Peciña.',
}

/** Privacy interstitial shown before leaving the site for WhatsApp. */
export const WHATSAPP_PRIVACY_NOTE: Record<Lang, string> = {
  es: 'WhatsApp se utilizará para el contacto inicial y la organización de la cita. Evita enviar información clínica sensible por este canal salvo que la doctora te indique lo contrario.',
  en: 'WhatsApp will be used for the initial contact and appointment scheduling. Please avoid sending sensitive clinical information through this channel unless the doctor asks you to.',
}

/**
 * Build the WhatsApp click-to-chat URL from country code + number
 * (digits only, no spaces, plus signs or formatting) and a message.
 */
export function buildWhatsAppUrl(message?: string, lang: Lang = 'es'): string {
  const text = message ?? WHATSAPP_DEFAULT_MESSAGE[lang]
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

/** Localized label for the interstitial buttons. */
export const WHATSAPP_INTERSTITIAL_COPY: Record<
  Lang,
  { title: string; continue: string; cancel: string }
> = {
  es: {
    title: 'Antes de continuar a WhatsApp',
    continue: 'Continuar a WhatsApp',
    cancel: 'Cancelar',
  },
  en: {
    title: 'Before continuing to WhatsApp',
    continue: 'Continue to WhatsApp',
    cancel: 'Cancel',
  },
}
