/** Privacy-preserving analytics stub.
 *
 * The site ships with Vercel Web Analytics (<Analytics />), which is
 * cookie-less and needs no consent banner. This module exists so future,
 * explicitly consented analytics can be wired in one place — and to make
 * it obvious that contact-form contents must NEVER be sent to analytics.
 */
export function trackEvent(_name: string, _props?: Record<string, unknown>) {
  // No-op by design. Do not add tracking that requires consent without
  // gating it behind an explicit opt-in.
}
