import { Player, type PlayerRef } from '@remotion/player'
import { useEffect, useRef } from 'react'
import { BRAND_COLORS, LogoIntro, type LogoIntroProps } from '../remotion/LogoIntro'
import { loadFlow } from '../remotion/flow'
import { FPS, INTRO_FRAMES } from '../remotion/timing'

type Props = {
  /** Fired when the sheet starts to lift, so the page can rise in with it. */
  onReveal: () => void
  /** Fired once the sheet is gone. */
  onDone: () => void
}

const INPUT: LogoIntroProps = { background: null, ink: BRAND_COLORS.sand, glint: BRAND_COLORS.glint, markSize: 0.6 }

// A flick: fast off the finger, long settle. Same curve the page uses to rise.
const SWIPE = 'cubic-bezier(0.32, 0.72, 0, 1)'
const SWIPE_MS = 1150

/**
 * The opening: the monogram draws itself from the teardrop up (a Remotion composition,
 * played in the page), then the whole bone sheet is swiped up to uncover the site.
 * Any click, key, wheel or touch skips straight to the swipe.
 */
export function Intro({ onReveal, onDone }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<PlayerRef>(null)
  const reduce = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const sheet = sheetRef.current!
    const stage = stageRef.current!
    const player = playerRef.current
    let leaving = false
    let disposed = false
    const timers: number[] = []

    const finish = () => {
      if (!disposed) onDone()
    }

    const leave = (fast: boolean) => {
      if (leaving) return
      leaving = true
      timers.forEach(clearTimeout)
      player?.pause()
      player?.seekTo(INTRO_FRAMES - 1)
      onReveal()

      if (reduce.current) {
        sheet.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, easing: 'ease', fill: 'forwards' }).finished.then(finish)
        return
      }
      const duration = fast ? 800 : SWIPE_MS
      // The mark lifts away slightly faster than the sheet, so the sheet reads as paper with depth.
      stage.animate(
        [
          { transform: 'translateY(0)', opacity: 1 },
          { transform: 'translateY(-18vh)', opacity: 0 },
        ],
        { duration: duration * 0.7, easing: SWIPE, fill: 'forwards' },
      )
      sheet
        .animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], { duration, easing: SWIPE, fill: 'forwards' })
        .finished.then(finish)
    }

    const skip = () => leave(true)
    const onEnded = () => timers.push(window.setTimeout(() => leave(false), 260))

    if (reduce.current) {
      timers.push(window.setTimeout(() => leave(false), 1100))
    } else if (player) {
      player.addEventListener('ended', onEnded)
      // Start once the flow map and the face are in, but never keep anyone waiting long.
      const ready = Promise.all([loadFlow(), document.fonts.load('400 20px "Jost Variable"')])
      const timeout = new Promise((r) => setTimeout(r, 1500))
      Promise.race([ready, timeout])
        .catch(() => undefined)
        .then(() => {
          if (!disposed && !leaving) player.play()
        })
      // If playback cannot start at all, the page still opens.
      timers.push(window.setTimeout(() => leave(false), 9000))
    }

    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })

    return () => {
      disposed = true
      timers.forEach(clearTimeout)
      player?.removeEventListener('ended', onEnded)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
    }
    // Runs once per mount; the callbacks are stable.
  }, [])

  return (
    <div ref={sheetRef} className="intro" aria-hidden="true">
      <div ref={stageRef} className="intro__stage">
        <Player
          ref={playerRef}
          component={LogoIntro}
          inputProps={INPUT}
          durationInFrames={INTRO_FRAMES}
          fps={FPS}
          compositionWidth={1080}
          compositionHeight={1080}
          initialFrame={reduce.current ? INTRO_FRAMES - 1 : 0}
          controls={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          moveToBeginningWhenEnded={false}
          // No sound in the intro. Unmuted, the player waits for an AudioContext that
          // browsers only start after a user gesture.
          initiallyMuted
          numberOfSharedAudioTags={0}
          acknowledgeRemotionLicense
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
