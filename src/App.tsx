import { lazy, Suspense, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Header } from './components/Header'
import { useLang } from './i18n/lang'
import { Collection } from './sections/Collection'
import { Contact } from './sections/Contact'
import { Details } from './sections/Details'
import { Footer } from './sections/Footer'
import { Hero } from './sections/Hero'
import { Process } from './sections/Process'

// The intro (Remotion player and composition) is its own chunk: returning visitors never load it.
const Intro = lazy(() => import('./components/Intro').then((m) => ({ default: m.Intro })))

const INTRO_KEY = 'arzu:intro-seen'

function introSeen() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1'
  } catch {
    return false
  }
}

type Phase = 'intro' | 'rising' | 'open'

type RGBA = [number, number, number, number]
type Ground = { ground: RGBA; fg: RGBA; fg2: RGBA; accent: RGBA; line: RGBA; dark: boolean }

const hex = (h: string, a = 1): RGBA => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
  a,
]

/** Mirrors the ground tokens in styles.css, so the page can be dyed between two of them. */
const GROUNDS: Record<string, Ground> = {
  bone: { ground: hex('#e8e5e0'), fg: hex('#1c1b18'), fg2: hex('#55514a'), accent: hex('#6b5f46'), line: hex('#948566', 0.6), dark: false },
  midnight: { ground: hex('#1a1e31'), fg: hex('#eceaf2'), fg2: hex('#b6b7cb'), accent: hex('#cdbb91'), line: hex('#cdbb91', 0.45), dark: true },
  noir: { ground: hex('#131212'), fg: hex('#eeebe5'), fg2: hex('#aca79e'), accent: hex('#c6b68d'), line: hex('#c6b68d', 0.42), dark: true },
  bordeaux: { ground: hex('#3b1114'), fg: hex('#f3e9e4'), fg2: hex('#d6bcb4'), accent: hex('#dcc192'), line: hex('#dcc192', 0.45), dark: true },
  olive: { ground: hex('#4e4c33'), fg: hex('#f3f1e3'), fg2: hex('#d8d5bc'), accent: hex('#e6d6a6'), line: hex('#e6d6a6', 0.5), dark: true },
  ink: { ground: hex('#1c1b18'), fg: hex('#ece9e3'), fg2: hex('#b2ada3'), accent: hex('#c2b38c'), line: hex('#c2b38c', 0.4), dark: true },
}

const mix = (a: RGBA, b: RGBA, t: number) => a.map((v, i) => v + (b[i] - v) * t) as RGBA
const css = (c: RGBA) => `rgb(${Math.round(c[0])} ${Math.round(c[1])} ${Math.round(c[2])} / ${+c[3].toFixed(3)})`
const smooth = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)

/**
 * Dyes the page as it is scrolled: the colour follows the scroll position itself, so a
 * dress's colour seeps in while its section approaches the middle of the screen and is
 * fully there once it arrives, instead of flipping when an edge crosses a line.
 */
function useGround() {
  useEffect(() => {
    const root = document.documentElement
    const meta = document.querySelector('meta[name="theme-color"]')
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-ground]'))
    let raf = 0
    let metaAt = 0
    let last = ''

    const paint = () => {
      raf = 0
      const vh = window.innerHeight
      const mid = vh * 0.5
      const zone = vh * 0.3
      const tops = els.map((el) => el.getBoundingClientRect().top)

      // The section under the middle line, then whether a boundary is close enough to blend.
      let i = 0
      while (i + 1 < els.length && tops[i + 1] <= mid) i++
      let from = GROUNDS[els[i].dataset.ground ?? 'bone']
      let to = from
      let t = 0
      if (i + 1 < els.length) {
        const next = GROUNDS[els[i + 1].dataset.ground ?? 'bone']
        const k = (mid - tops[i + 1] + zone) / (2 * zone)
        if (next !== from && k > 0) {
          to = next
          t = smooth(Math.min(1, k))
        }
      }
      if (i > 0 && t === 0) {
        // Just past a boundary: finish the blend that began before it.
        const prev = GROUNDS[els[i - 1].dataset.ground ?? 'bone']
        const k = (mid - tops[i] + zone) / (2 * zone)
        if (prev !== from && k < 1) {
          to = from
          from = prev
          t = smooth(Math.max(0, k))
        }
      }

      const g: Ground = {
        ground: mix(from.ground, to.ground, t),
        fg: mix(from.fg, to.fg, t),
        fg2: mix(from.fg2, to.fg2, t),
        accent: mix(from.accent, to.accent, t),
        line: mix(from.line, to.line, t),
        dark: t > 0.5 ? to.dark : from.dark,
      }
      const key = css(g.ground) + css(g.fg)
      if (key === last) return
      last = key
      const s = root.style
      s.setProperty('--ground', css(g.ground))
      s.setProperty('--fg', css(g.fg))
      s.setProperty('--fg-2', css(g.fg2))
      s.setProperty('--accent', css(g.accent))
      s.setProperty('--line', css(g.line))
      s.setProperty('--scheme', g.dark ? 'dark' : 'light')
      // Keep the mobile browser chrome in the same dye, a few times a second.
      const now = performance.now()
      if (meta && now - metaAt > 120) {
        metaAt = now
        const c = g.ground
        meta.setAttribute('content', `#${[c[0], c[1], c[2]].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`)
      }
    }
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', queue, { passive: true })
    window.addEventListener('resize', queue)
    return () => {
      window.removeEventListener('scroll', queue)
      window.removeEventListener('resize', queue)
      cancelAnimationFrame(raf)
    }
  }, [])
}

/** Unveils .reveal frames the first time they come into view. */
function useReveal(active: boolean) {
  useEffect(() => {
    if (!active) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -5% 0px' },
    )
    document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [active])
}

export default function App() {
  const { t } = useLang()
  const [phase, setPhase] = useState<Phase>(() => (introSeen() ? 'open' : 'intro'))

  useGround()
  useReveal(phase !== 'intro')

  // The page stays still under the sheet until the swipe has finished.
  useLayoutEffect(() => {
    document.documentElement.classList.toggle('is-intro', phase !== 'open')
  }, [phase])

  const reveal = useCallback(() => setPhase('rising'), [])
  const done = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      // Private mode: the intro plays again next time.
    }
    setPhase('open')
  }, [])

  return (
    <>
      {phase !== 'open' && (
        <Suspense fallback={<div className="intro" aria-hidden="true" />}>
          <Intro onReveal={reveal} onDone={done} />
        </Suspense>
      )}
      <div className="site" data-phase={phase}>
        <a className="skip-link" href="#collection">
          {t.skip}
        </a>
        <Header />
        <main>
          <Hero />
          <Collection />
          <Details />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
