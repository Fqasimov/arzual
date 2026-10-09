import type { LookId } from '../i18n/copy'

export type Photo = { name: string; width: number; height: number; sizes: number[] }

const base = import.meta.env.BASE_URL

type Format = 'avif' | 'webp'

export const srcSet = (p: Photo, format: Format = 'webp') =>
  p.sizes.map((w) => `${base}looks/${p.name}-${w}.${format} ${w}w`).join(', ')
export const src = (p: Photo) => `${base}looks/${p.name}-${p.sizes[p.sizes.length - 1]}.webp`

export const HERO: Photo = { name: 'ivory-stairs', width: 1170, height: 1428, sizes: [720, 1170] }

export type Look = {
  id: LookId
  photo: Photo
  /** Where the eye should stay when the photo is cropped. */
  focus?: string
  second?: Photo
}

export const LOOKS: Look[] = [
  {
    id: 'midnight',
    photo: { name: 'navy-detail', width: 1170, height: 1547, sizes: [720, 1170] },
    second: { name: 'navy-flatlay', width: 1146, height: 1552, sizes: [720, 1146] },
  },
  { id: 'noir', photo: { name: 'noir-back', width: 1170, height: 1556, sizes: [720, 1170] }, focus: '50% 30%' },
  { id: 'bordeaux', photo: { name: 'bordeaux', width: 1168, height: 1549, sizes: [720, 1168] }, focus: '50% 20%' },
  { id: 'olive', photo: { name: 'olive-tag', width: 1152, height: 1538, sizes: [720, 1152] } },
]

export const DETAILS = {
  pintuck: { name: 'detail-pintuck', width: 530, height: 530, sizes: [530] },
  lace: { name: 'detail-lace', width: 420, height: 420, sizes: [420] },
  jacquard: { name: 'detail-jacquard', width: 500, height: 500, sizes: [500] },
  pearls: { name: 'detail-pearls', width: 310, height: 310, sizes: [310] },
} satisfies Record<string, Photo>
