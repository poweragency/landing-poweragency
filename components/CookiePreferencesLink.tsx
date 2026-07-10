"use client";

import { openCookiePreferences } from "@/lib/consent";

// Link persistente nel footer per modificare/revocare il consenso cookie
// in qualsiasi momento (riapre il pannello preferenze del CookieBanner).
export default function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      data-cursor="hover"
      className="block py-1.5 text-left text-[0.95rem] text-mut transition-colors hover:text-orange"
    >
      Preferenze cookie
    </button>
  );
}
