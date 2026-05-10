export type CookieConsentValue = "accepted" | "rejected";

export const COOKIE_CONSENT_STORAGE_KEY = "cookie-consent";

export function getCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") {
    return null;
  }

  const consent = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return consent === "accepted" || consent === "rejected" ? consent : null;
}

export function canLoadNonEssentialCookies() {
  return getCookieConsent() === "accepted";
}
