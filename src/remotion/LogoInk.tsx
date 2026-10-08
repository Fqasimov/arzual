import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cancelRender, continueRender, delayRender, getRemotionEnvironment } from 'remotion'
import { LOGO_PATH } from '../brand/logo-path'
import { FLOW_H, FLOW_W, loadFlow } from './flow'

type Props = {
  /** 0: nothing drawn, 1: the whole monogram. */
  progress: number
  /** Settled ink colour. */
  ink: string
  /** Colour of the wet ink right at the drawing front. */
  glint: string
  className?: string
}

const SCALE = 2 // canvas pixels per logo unit
const FEATHER = 0.014 // softness of the drawing front, as a share of the whole path
const GLINT = 0.05 // how far behind the front the ink is still "wet"

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))

let path: Path2D | null = null
let off: { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D; img: ImageData } | null = null

function draw(canvas: HTMLCanvasElement, flow: Uint16Array, progress: number, ink: string, glint: string) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  path ??= new Path2D(LOGO_PATH)
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.globalCompositeOperation = 'source-over'
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (progress <= 0) return

  if (progress >= 1) {
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
    ctx.fillStyle = ink
    ctx.fill(path, 'evenodd')
    return
  }

  if (!off) {
    const c = document.createElement('canvas')
    c.width = FLOW_W
    c.height = FLOW_H
    const octx = c.getContext('2d')!
    off = { canvas: c, ctx: octx, img: octx.createImageData(FLOW_W, FLOW_H) }
  }
  const [ir, ig, ib] = hex(ink)
  const [gr, gg, gb] = hex(glint)
  const data = off.img.data
  const t = progress * (1 + FEATHER)
  for (let i = 0, n = flow.length; i < n; i++) {
    const behind = t - flow[i] / 65535
    const o = i * 4
    if (behind <= 0) {
      data[o + 3] = 0
      continue
    }
    const a = behind >= FEATHER ? 1 : behind / FEATHER
    const wet = behind >= GLINT ? 0 : 1 - behind / GLINT
    const w = wet * wet
    data[o] = ir + (gr - ir) * w
    data[o + 1] = ig + (gg - ig) * w
    data[o + 2] = ib + (gb - ib) * w
    data[o + 3] = a * 255
  }
  off.ctx.putImageData(off.img, 0, 0)

  // The flow map decides where ink has reached; the vector path keeps the edges crisp.
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(off.canvas, 0, 0, canvas.width, canvas.height)
  ctx.globalCompositeOperation = 'destination-in'
  ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0)
  ctx.fill(path, 'evenodd')
  ctx.globalCompositeOperation = 'source-over'
}

/** The monogram drawing itself, upward from the teardrop, like ink running along the strokes. */
export function LogoInk({ progress, ink, glint, className }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [flow, setFlow] = useState<Uint16Array | null>(null)
  // Only a render (CLI or Studio) has to wait for the map; in the Player a pending
  // delayRender would hold playback, and the site waits for the map before playing.
  const [handle] = useState(() => (getRemotionEnvironment().isPlayer ? null : delayRender('Loading the logo flow map')))

  useEffect(() => {
    loadFlow()
      .then((f) => {
        setFlow(f)
        if (handle !== null) continueRender(handle)
      })
      .catch((err) => (handle !== null ? cancelRender(err) : console.error(err)))
  }, [handle])

  useLayoutEffect(() => {
    if (ref.current && flow) draw(ref.current, flow, progress, ink, glint)
  }, [flow, progress, ink, glint])

  return (
    <canvas
      ref={ref}
      className={className}
      width={FLOW_W * SCALE}
      height={FLOW_H * SCALE}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    />
  )
}
