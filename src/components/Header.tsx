import { Monogram } from '../brand/Monogram'
import { LANGS } from '../i18n/copy'
import { useLang } from '../i18n/lang'

export function Header() {
  const { t, lang, setLang } = useLang()
  return (
    <header className="header">
      <a className="header__brand" href="#top" aria-label="Arzu Almazzadeh">
        <Monogram className="header__mark" />
        <span className="header__name" aria-hidden="true">
          Arzu Almazzadeh
        </span>
      </a>
      <nav className="header__nav">
        <a href="#collection">{t.nav.collection}</a>
        <a href="#details">{t.nav.details}</a>
        <a href="#process">{t.nav.process}</a>
      </nav>
      <div className="header__end">
        <div className="lang" role="group" aria-label={t.nav.language}>
          {LANGS.map((l) => (
            <button key={l} type="button" className="lang__option" aria-pressed={l === lang} onClick={() => setLang(l)} lang={l}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <a className="header__cta" href="#contact">
          {t.nav.contact}
        </a>
      </div>
    </header>
  )
}
