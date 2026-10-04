import { MessageCircle } from 'lucide-react'
import { useLanguage, pick, type Lang } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import { CTA_LABEL } from '../data/navigation'

const COPY: Record<string, Record<Lang, string>> = {
  floatLabel: {
    es: 'Contactar por WhatsApp',
    en: 'Contact via WhatsApp',
  },
}

/** Desktop-only floating WhatsApp button (bottom right). */
export function WhatsAppFloat() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <button
      type="button"
      onClick={() => requestWhatsApp()}
      aria-label={pick(lang, COPY.floatLabel)}
      className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#1faa53] text-white shadow-lg shadow-navy-950/20 transition-transform hover:scale-105 md:flex"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </button>
  )
}

/**
 * Mobile-only sticky bottom bar. A spacer reserves the same height in the
 * document flow so the bar never covers page content.
 */
export function StickyMobileBar() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()

  return (
    <>
      <div aria-hidden="true" className="h-[92px] md:hidden" />
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-mist-200 bg-white/95 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="px-4 pb-4 pt-3">
          <button
            type="button"
            onClick={() => requestWhatsApp()}
            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#1faa53] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#1b9348]"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
            {pick(lang, CTA_LABEL)}
          </button>
        </div>
      </div>
    </>
  )
}
