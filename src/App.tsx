import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { StickyMobileBar } from './components/WhatsAppCtas'
import { InstallPrompt } from './components/InstallPrompt'
import Home from './pages/Home'
import About from './pages/About'
import Telepsychiatry from './pages/Telepsychiatry'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import Privacy from './pages/Privacy'
import LegalNotice from './pages/LegalNotice'
import Cookies from './pages/Cookies'
import NotFound from './pages/NotFound'

/** Scroll to top on route change; honor in-page anchors like /#primera-consulta. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '')
      // Wait a tick so the target page has rendered.
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => window.clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-navy-800 focus:px-5 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main-content" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/la-dra-pecina" element={<About />} />
          <Route path="/telepsiquiatria" element={<Telepsychiatry />} />
          <Route path="/preguntas-frecuentes" element={<Faq />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/aviso-legal" element={<LegalNotice />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <StickyMobileBar />
      {/* Subtle install affordance (renders only when the browser allows it) */}
      <div className="fixed bottom-6 left-4 z-40 hidden md:block">
        <InstallPrompt />
      </div>
    </div>
  )
}
