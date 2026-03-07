"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("cookie_consent="))
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function setCookie(value: string) {
    const d = new Date()
    d.setFullYear(d.getFullYear() + 1)
    document.cookie = `cookie_consent=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`
    window.dispatchEvent(new Event("cookie-consent-update"))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 md:p-6">
      <div className="mx-auto flex max-w-lg flex-col gap-4 border border-border bg-card p-5 shadow-2xl md:flex-row md:items-center md:gap-6 md:p-6">
        <button
          onClick={() => setCookie("declined")}
          className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground md:hidden"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            We use cookies
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            This site uses cookies and analytics to improve your experience. By
            accepting, you agree to our use of cookies for analytics purposes.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={() => setCookie("declined")}
            className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground"
          >
            Decline
          </button>
          <button
            onClick={() => setCookie("accepted")}
            className="bg-foreground px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-80"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
