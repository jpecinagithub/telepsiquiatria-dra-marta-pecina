import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'
import { useWhatsApp } from './WhatsAppProvider'
import { CTA_LABEL } from '../data/navigation'

/**
 * Mobile-only sticky bottom bar. A spacer reserves the same height in the
 * document flow so the bar never covers page content. The bar stays hidden
 * while the hero CTA is on screen, so the same action is never shown twice.
 */
export function StickyMobileBar() {
  const { lang } = useLanguage()
  const { requestWhatsApp } = useWhatsApp()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const heroCta = document.getElementById('hero-cta')
    if (!heroCta) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(heroCta)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div aria-hidden="true" className="h-[92px] md:hidden" />
      <div
        aria-hidden={!visible}
        className={
          'fixed inset-x-0 bottom-0 z-40 border-t border-mist-200 bg-white/95 backdrop-blur transition-transform duration-300 md:hidden ' +
          (visible ? 'translate-y-0' : 'pointer-events-none translate-y-full')
        }
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="px-4 pb-4 pt-3">
          <button
            type="button"
            tabIndex={visible ? 0 : -1}
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
