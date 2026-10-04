import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { useLanguage, pick } from '../i18n/LanguageContext'

const COPY = {
  install: {
    es: 'Instalar app',
    en: 'Install app',
  },
} as const

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

/**
 * Subtle "Install app" button — rendered only after the browser exposes
 * the beforeinstallprompt event. Never forced.
 */
export function InstallPrompt() {
  const { lang } = useLanguage()
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BeforeInstallPromptEvent)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  if (!deferred) return null

  return (
    <button
      onClick={() => {
        void deferred.prompt()
        void deferred.userChoice.finally(() => setDeferred(null))
      }}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-navy-800/90 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur transition-colors hover:bg-navy-800"
    >
      <Download className="h-4 w-4" aria-hidden="true" />
      {pick(lang, COPY.install)}
    </button>
  )
}
