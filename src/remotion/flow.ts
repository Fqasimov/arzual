import flowUrl from '../brand/logo-flow.png'
import { LOGO_VIEWBOX } from '../brand/logo-path'

export const FLOW_W = LOGO_VIEWBOX.width
export const FLOW_H = LOGO_VIEWBOX.height

let cache: Promise<Uint16Array> | null = null

/**
 * The ink-flow map: for each pixel of the monogram, how far the ink travels along the
 * strokes from the bottom of the teardrop (0..65535). See scripts/trace-logo.py.
 */
export function loadFlow(): Promise<Uint16Array> {
  cache ??= new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return reject(new Error('2D canvas unavailable'))
      ctx.drawImage(img, 0, 0)
      const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const out = new Uint16Array(canvas.width * canvas.height)
      for (let i = 0; i < out.length; i++) out[i] = (data[i * 4] << 8) | data[i * 4 + 1]
      resolve(out)
    }
    img.onerror = () => reject(new Error('Could not load the logo flow map'))
    img.src = flowUrl
  })
  return cache
}
