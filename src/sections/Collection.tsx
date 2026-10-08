import { ArrowIcon } from '../components/Icons'
import { Picture } from '../components/Picture'
import { LOOKS } from '../data/photos'
import { useLang } from '../i18n/lang'
import { whatsappUrl } from '../lib/contact'

/**
 * The swatch book. Each look owns a full screen, and while it is in the middle of the
 * viewport the whole page is dyed in the colour of the dress (see useGround in App).
 */
export function Collection() {
  const { t } = useLang()
  return (
    <>
      <section id="collection" className="collection" data-ground="bone" aria-labelledby="collection-title">
        <h2 id="collection-title" className="collection__title">
          {t.collection.title}
        </h2>
        <p className="collection__lead">{t.collection.lead}</p>
      </section>

      {LOOKS.map((look) => {
        const c = t.collection.looks[look.id]
        return (
          <article key={look.id} className={`look look--${look.id}`} data-ground={look.id} aria-labelledby={`look-${look.id}`}>
            <h3 id={`look-${look.id}`} className="look__name">
              {c.name}
            </h3>
            <Picture
              photo={look.photo}
              alt={`${c.name}. ${c.note}`}
              sizes="(min-width: 900px) 46vw, 92vw"
              focus={look.focus}
              className="look__photo"
            />
            {look.second && (
              <figure className="look__second">
                <Picture photo={look.second} alt={t.collection.styled} sizes="(min-width: 900px) 24vw, 56vw" />
                <figcaption className="look__caption">{t.collection.styled}</figcaption>
              </figure>
            )}
            <div className="look__text">
              <p className="look__cloth">{c.cloth}</p>
              <p className="look__note">{c.note}</p>
              <a className="link-cta" href={whatsappUrl(t.wa.look(c.name))} target="_blank" rel="noopener noreferrer">
                {t.collection.ask}
                <ArrowIcon className="link-cta__arrow" />
              </a>
            </div>
          </article>
        )
      })}
    </>
  )
}
