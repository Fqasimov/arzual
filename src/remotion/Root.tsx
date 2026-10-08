import '@fontsource-variable/jost'
import { useEffect, useState } from 'react'
import { Composition, continueRender, delayRender } from 'remotion'
import { BRAND_COLORS, LogoIntro } from './LogoIntro'
import { FPS, INTRO_FRAMES, REEL_FRAMES } from './timing'

function useFonts() {
  const [handle] = useState(() => delayRender('Loading Jost'))
  useEffect(() => {
    document.fonts.load('400 40px "Jost Variable"').finally(() => continueRender(handle))
  }, [handle])
}

export function RemotionRoot() {
  useFonts()
  return (
    <>
      {/* The intro the site plays (transparent, the page paints the bone sheet). */}
      <Composition
        id="LogoIntro"
        component={LogoIntro}
        durationInFrames={INTRO_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
        defaultProps={{ background: BRAND_COLORS.bone, ink: BRAND_COLORS.sand, glint: BRAND_COLORS.glint, markSize: 0.6 }}
      />
      {/* The same moment as a vertical video for Instagram stories and reels. */}
      <Composition
        id="LogoIntroReel"
        component={LogoIntro}
        durationInFrames={REEL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={{ background: BRAND_COLORS.bone, ink: BRAND_COLORS.sand, glint: BRAND_COLORS.glint, markSize: 0.66 }}
      />
    </>
  )
}
