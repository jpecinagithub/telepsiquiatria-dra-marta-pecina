import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import '@fontsource/lora/400.css'
import '@fontsource/lora/500.css'
import '@fontsource/lora/600.css'
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
import './index.css'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import { WhatsAppProvider } from './components/WhatsAppProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <WhatsAppProvider>
          <App />
          <Analytics />
        </WhatsAppProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
)
