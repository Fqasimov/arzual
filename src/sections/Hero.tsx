import { ArrowIcon, WhatsAppIcon } from '../components/Icons'
import { Picture } from '../components/Picture'
import { HERO } from '../data/photos'
import { useLang } from '../i18n/lang'
import { whatsappUrl } from '../lib/contact'

/** The hang tag, at page scale: huge cropped ARZU, the name set small and spaced, the photograph. */
export function Hero() {
  const { t } = useLang()
  return (
    <section id="top" className="hero" data-ground="bone" aria-labelledby="hero-title">
      <div className="hero__copy">
        <h1 id="hero-title" className="hero__title">
          {t.hero.title}
        </h1>
        <p className="hero__lead">{t.hero.lead}</p>
        <div className="hero__actions">
          <a className="button button--solid" href={whatsappUrl(t.wa.hero)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon className="button__icon" />
            {t.hero.cta}
          </a>
          <a className="button button--line" href="#collection">
            {t.hero.secondary}
            <ArrowIcon className="button__arrow" />
          </a>
        </div>
      </div>

      <figure className="hero__figure">
        <Picture photo={HERO} alt={t.hero.caption} sizes="(min-width: 900px) 42vw, 100vw" className="hero__photo" eager />
        <div className="hero__meta">
          <figcaption className="hero__caption">{t.hero.caption}</figcaption>
          <span className="tag">
            <span className="tag__hole" aria-hidden="true" />
            {t.hero.madeIn}
          </span>
        </div>
      </figure>

      <p className="hero__surname" aria-hidden="true">
        Almazzadeh
      </p>
      <p className="hero__arzu" aria-hidden="true">
        {'ARZU'.split('').map((l, i) => (
          <span key={i} style={{ ['--i' as string]: i }}>
            {l}
          </span>
        ))}
      </p>
    </section>
  )
}
