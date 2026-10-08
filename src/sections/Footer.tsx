import { Monogram } from '../brand/Monogram'
import { useLang } from '../i18n/lang'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../lib/contact'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="footer" data-ground="ink">
      <Monogram className="footer__mark" title="Arzu Almazzadeh" />
      <p className="footer__name">Arzu Almazzadeh</p>
      <p className="footer__made">{t.footer.madeIn}</p>
      <div className="footer__row">
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          @{INSTAGRAM_HANDLE}
        </a>
        <span>
          © {new Date().getFullYear()} Arzu Almazzadeh. {t.footer.rights}
        </span>
      </div>
    </footer>
  )
}
