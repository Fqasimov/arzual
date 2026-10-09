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

/**
 * Dyes the page in the colour of whatever section crosses the middle of the viewport.
 * The colours themselves live in CSS under html[data-ground].
 */
function useGround() {
  useEffect(() => {
    const root = document.documentElement
    const meta = document.querySelector('meta[name="theme-color"]')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          root.dataset.ground = (e.target as HTMLElement).dataset.ground
          // Keep the mobile browser chrome in the same dye.
          meta?.setAttribute('content', getComputedStyle(root).getPropertyValue('--ground').trim())
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    document.querySelectorAll('[data-ground]').forEach((el) => io.observe(el))
    return () => io.disconnect()
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
