import type { Lang } from '../i18n/LanguageContext'

export interface NavItem {
  to: string
  label: Record<Lang, string>
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/', label: { es: 'Inicio', en: 'Home' } },
  { to: '/la-dra-pecina', label: { es: 'La Dra. Peciña', en: 'Dr. Peciña' } },
  { to: '/telepsiquiatria', label: { es: 'Telepsiquiatría', en: 'Telepsychiatry' } },
  { to: '/#primera-consulta', label: { es: 'Primera consulta', en: 'First consultation' } },
  { to: '/preguntas-frecuentes', label: { es: 'Preguntas frecuentes', en: 'FAQ' } },
  { to: '/contacto', label: { es: 'Contacto', en: 'Contact' } },
]

export const LEGAL_ITEMS: NavItem[] = [
  { to: '/privacidad', label: { es: 'Política de privacidad', en: 'Privacy Policy' } },
  { to: '/aviso-legal', label: { es: 'Aviso legal', en: 'Legal Notice' } },
  { to: '/cookies', label: { es: 'Política de cookies', en: 'Cookie Policy' } },
]

export const CTA_LABEL: Record<Lang, string> = {
  es: 'Solicitar primera consulta',
  en: 'Request an initial consultation',
}
