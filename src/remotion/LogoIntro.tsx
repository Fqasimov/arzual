import type { CSSProperties } from 'react'
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion'
import { LogoInk } from './LogoInk'
import { CORD_FROM, CORD_TO, DRAW_FROM, DRAW_TO, NAME_FROM, NAME_LETTER, NAME_STAGGER } from './timing'

export type LogoIntroProps = {
  /** Page colour behind the mark; null keeps the composition transparent (the site paints it). */
  background: string | null
  ink: string
  glint: string
  /** Width of the monogram as a share of the shorter side. */
  markSize: number
}

export const BRAND_COLORS = { bone: '#E8E5E0', sand: '#948566', glint: '#E6D6AE', sandInk: '#6E6249' }

const WORDS = ['ARZU', 'ALMAZZADEH']
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const
const easeOutExpo = Easing.bezier(0.16, 1, 0.3, 1)

export function LogoIntro({ background, ink, glint, markSize }: LogoIntroProps) {
  const frame = useCurrentFrame()
  const { width, height } = useVideoConfig()
  const unit = Math.min(width, height)

  // The ink travels slowly out of the teardrop, picks up pace through the loops, and settles at the top.
  const progress = interpolate(frame, [DRAW_FROM, DRAW_TO], [0, 1], { ...clamp, easing: Easing.bezier(0.5, 0.04, 0.24, 1) })
  // The mark rises a touch as it draws, so the growth reads as upward.
  const lift = interpolate(frame, [DRAW_FROM, DRAW_TO + 30], [unit * 0.018, 0], { ...clamp, easing: Easing.out(Easing.cubic) })
  const cord = interpolate(frame, [CORD_FROM, CORD_TO], [0, 1], { ...clamp, easing: Easing.bezier(0.77, 0, 0.175, 1) })

  let index = 0
  const fontSize = unit * 0.034

  return (
    <AbsoluteFill style={{ background: background ?? 'transparent', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: unit * 0.07 }}>
        <div style={{ width: unit * markSize, transform: `translateY(${lift}px)` }}>
          <LogoInk progress={progress} ink={ink} glint={glint} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: unit * 0.03 }}>
          <div
            style={{
              display: 'flex',
              gap: '0.9em',
              fontFamily: '"Jost Variable", "Jost", sans-serif',
              fontWeight: 400,
              fontSize,
              letterSpacing: '0.42em',
              color: ink,
              // Optical centring: tracking adds space after the last letter.
              marginRight: '-0.42em',
            }}
          >
            {WORDS.map((word) => (
              <span key={word} style={{ display: 'flex', overflow: 'hidden', padding: '0.1em 0' }}>
                {word.split('').map((letter, i) => {
                  const start = NAME_FROM + index++ * NAME_STAGGER
                  const y = interpolate(frame, [start, start + NAME_LETTER], [105, 0], { ...clamp, easing: easeOutExpo })
                  const style: CSSProperties = { display: 'inline-block', transform: `translateY(${y}%)` }
                  return (
                    <span key={i} style={style}>
                      {letter}
                    </span>
                  )
                })}
              </span>
            ))}
          </div>
          <div style={{ width: unit * 0.16, height: Math.max(1, unit * 0.0016), background: ink, transform: `scaleX(${cord})`, opacity: 0.7 }} />
        </div>
      </div>
    </AbsoluteFill>
  )
}
