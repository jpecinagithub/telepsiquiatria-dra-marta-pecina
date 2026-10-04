# Dra. Marta Peciña — Consulta de Telepsiquiatría

Premium, bilingual (EN/ES, EN default), production-ready informational PWA for a
private telepsychiatry practice. Frontend-only: no backend, no patient portal,
no clinical data stored anywhere.

**Stack:** Vite 6 · React 19 · TypeScript · Tailwind CSS v4 · React Router 7 ·
lucide-react · framer-motion (subtle micro-animations only) · vite-plugin-pwa ·
Vercel Web Analytics (`@vercel/analytics`, cookie-less).

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check (tsc --noEmit) + production build
npm run preview  # serve the production build locally
```

## Deploy to Vercel

No modifications needed:

1. Push this folder to a Git repository.
2. Import it in Vercel (Framework Preset: **Vite**).
3. Deploy. `vercel.json` contains the SPA rewrite (`/(.*)` → `/index.html`).
4. **Enable Web Analytics**: Vercel Dashboard → Project → Analytics → Enable.
   The `<Analytics />` component is already mounted in `src/main.tsx`; it is
   cookie-less, so no consent banner is required.
5. After deploying, set `siteUrl` in `src/config/practice.ts` to the production
   URL and replace `__BASE_URL__` in `public/sitemap.xml` with the same domain.

## Project structure

```
src/
  components/   Header, Hero, TrustIndicators, AboutDoctor, Services,
                HowItWorks, FirstConsultation, FaqSection, WhatsAppCtas
                (WhatsAppFloat, StickyMobileBar, CtaBand), ContactForm,
                EmergencyNotice, Footer, InstallPrompt, WhatsAppProvider
                (privacy interstitial), Seo (usePageMeta, JsonLd), ui
                (Container, Section, SectionHeading, Reveal)
  pages/        Home, About, Telepsychiatry, Faq, Contact, Privacy,
                LegalNotice, Cookies, NotFound
  data/         navigation.ts, faq.ts (12 bilingual Q&A)
  i18n/         LanguageContext.tsx (EN default; choice is NOT persisted —
                the site writes nothing to browser storage)
  config/       practice.ts — ALL unverified fields are '' / [] and their UI
                is hidden until the practice supplies real values
  utils/        whatsapp.ts (wa.me URL builder), analytics.ts (privacy stub)
public/
  logo.jpg, images/ (WebP + JPG, responsive sizes), icons/ (PWA),
  manifest (inline in vite.config.ts), offline.html, robots.txt, sitemap.xml
```

## WhatsApp Business (main first-contact channel)

- Number: **+34 711 29 94 79** → `https://wa.me/34711299479` (built by
  `buildWhatsAppUrl()` in `src/utils/whatsapp.ts`; digits only, message
  URL-encoded, localized default message).
- Every CTA goes through a **privacy interstitial** ("Continuar a
  WhatsApp" / "Cancelar") warning not to send sensitive clinical information.
- WhatsApp is presented strictly as a **first-contact / administrative**
  channel — never as an emergency or diagnostic channel.

### Recommended WhatsApp Business profile (configure in the WA Business app)

- Business name: `Dra. Marta Peciña – Consulta de Telepsiquiatría`
- Category: Psychiatrist / Medical service
- Description: `Consulta especializada de telepsiquiatría. Atención profesional, personalizada y confidencial mediante consulta online.`
- Add: website URL, business email, contact hours, logo, professional photo.
- Labels: `Nuevo contacto`, `Información enviada`, `Pendiente de cita`,
  `Cita confirmada`, `Seguimiento`, `No continuar`.
- Greeting message: `Hola, gracias por contactar con la consulta de la Dra. Marta Peciña. Hemos recibido tu mensaje. Te responderemos lo antes posible para indicarte los siguientes pasos.`

### Suggested quick replies (administrative only — never diagnostic)

| Shortcut       | Reply (ES) |
|----------------|-----------|
| `/primera` | Gracias por contactar. Para organizar una primera consulta necesitaremos confirmar algunos datos básicos y comprobar si la teleconsulta es adecuada para tu situación. |
| `/precio` | Te facilitaremos el precio de la consulta antes de confirmar la cita. |
| `/disponibilidad` | Indícanos por favor qué franjas horarias te vienen mejor y trataremos de ofrecerte una opción disponible. |
| `/teleconsulta` | La consulta se realiza online. Antes de la cita recibirás las instrucciones necesarias para conectarte. |
| `/cambio` | Si necesitas cambiar o cancelar una cita, escríbenos indicando tu nombre y la fecha de la cita. |
| `/urgencias` | Esta consulta no es un servicio de urgencias. Si existe riesgo inmediato para ti o para otra persona, contacta con los servicios de urgencias de tu zona. En España, llama al 112. |

Do **not** use automated replies for symptom assessment or diagnosis, and do not
ask for detailed clinical history in the first automated interaction.

## Contact form → backend hook (for later)

The form at `src/components/ContactForm.tsx` is frontend-only: it validates
client-side (honeypot + in-memory rate guard included) and shows a confirmation
panel that continues via WhatsApp. To attach a real backend later:

1. Add an endpoint (e.g. a Vercel serverless function at `/api/contact`).
2. POST the validated payload as JSON over HTTPS.
3. Server-side: validate again, rate-limit, add bot protection (e.g. Turnstile),
   store GDPR-compliantly with an explicit deletion policy, notify the practice.
4. Replace the "continue via WhatsApp" step in `ContactForm.tsx` with the
   `fetch()` call; keep the WhatsApp fallback.

Never send form contents to analytics and never persist them in browser storage.

## Privacy & safety notes

- No `localStorage`/`sessionStorage` usage anywhere in the codebase.
- Service worker caches **only static public assets**; form data, personal
  data and third-party messaging content are never cached.
- The form never asks for psychiatric symptoms; the free-text field carries an
  explicit warning against sensitive clinical information.
- Emergency notice ("Esta consulta no es un servicio de urgencias… 112")
  appears on Home, FAQ, Contact, footer and next to the form.
- No Meta Pixel, no session replay, no marketing opt-ins.
- No cookie banner: the site sets no non-essential cookies
  (see `src/pages/Cookies.tsx`).

## Photos & logo

- Logo: supplied by the practice (`public/logo.jpg`, also `src/assets/logo.jpg`).
- The three editorial photos (`public/images/`) were generated originally for
  this site; the on-screen psychiatrist in the teleconsultation photo is a
  generic, unidentifiable silhouette — not a portrayal of Dra. Peciña.
