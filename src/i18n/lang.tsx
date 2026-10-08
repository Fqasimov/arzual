import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { COPY, LANGS, type Copy, type Lang } from './copy'

const KEY = 'arzu:lang'

function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl && (LANGS as readonly string[]).includes(fromUrl)) return fromUrl as Lang
  try {
    const saved = localStorage.getItem(KEY)
    if (saved && (LANGS as readonly string[]).includes(saved)) return saved as Lang
  } catch {
    // Storage can be blocked; Azerbaijani is the default.
  }
  return 'az'
}

type Ctx = { lang: Lang; t: Copy; setLang: (l: Lang) => void }
const LangContext = createContext<Ctx | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(KEY, l)
    } catch {
      // Not remembered next visit; the switch still works now.
    }
  }, [])

  useEffect(() => {
    const t = COPY[lang]
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang])

  const value = useMemo(() => ({ lang, t: COPY[lang], setLang }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
