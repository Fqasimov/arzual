import type { PointerEvent } from 'react'
import { srcSet, src } from '../data/photos'
import { DETAILS } from '../data/photos'
import { useLang } from '../i18n/lang'

type Key = keyof typeof DETAILS
const ORDER: Key[] = ['pintuck', 'lace', 'jacquard', 'pearls']

// With a fine pointer, the close-up magnifies around the cursor: the cloth under the eye.
function follow(e: PointerEvent<HTMLDivElement>) {
  if (e.pointerType !== 'mouse') return
  const img = e.currentTarget.querySelector('img')
  if (!img) return
  const r = e.currentTarget.getBoundingClientRect()
  img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`
}

export function Details() {
  const { t } = useLang()
  return (
    <section id="details" className="details" data-ground="bone" aria-labelledby="details-title">
      <div className="details__head">
        <h2 id="details-title" className="details__title">
          {t.details.title}
        </h2>
        <p className="details__lead">{t.details.lead}</p>
      </div>
      <ul className="details__list">
        {ORDER.map((key) => {
          const photo = DETAILS[key]
          const item = t.details.items[key]
          return (
            <li key={key} className={`detail detail--${key}`}>
              <div className="detail__frame reveal" onPointerMove={follow}>
                <img
                  src={src(photo)}
                  srcSet={srcSet(photo)}
                  sizes="(min-width: 900px) 30vw, 80vw"
                  width={photo.width}
                  height={photo.height}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h3 className="detail__title">{item.title}</h3>
              <p className="detail__text">{item.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
