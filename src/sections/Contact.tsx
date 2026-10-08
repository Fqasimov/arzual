import { useId, useState, type FormEvent } from 'react'
import { InstagramIcon, WhatsAppIcon } from '../components/Icons'
import { useLang } from '../i18n/lang'
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, whatsappUrl } from '../lib/contact'

type Occasion = 'wedding' | 'engagement' | 'evening' | 'other'
const OCCASIONS: Occasion[] = ['wedding', 'engagement', 'evening', 'other']

/** The consultation: a few lines here, then the conversation moves to WhatsApp. */
export function Contact() {
  const { t, lang } = useLang()
  const id = useId()
  const [name, setName] = useState('')
  const [occasion, setOccasion] = useState<Occasion | ''>('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)
  const [sentUrl, setSentUrl] = useState<string | null>(null)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setError(true)
      document.getElementById(`${id}-name`)?.focus()
      return
    }
    const when = date ? new Date(`${date}T12:00:00`).toLocaleDateString(lang, { day: 'numeric', month: 'long', year: 'numeric' }) : ''
    const text = t.wa.form({
      name: name.trim(),
      occasion: occasion ? t.contact.occasions[occasion] : '',
      date: when,
      message: message.trim(),
    })
    const url = whatsappUrl(text)
    // A real link click opens where pop-ups are blocked; the visible link below covers the rest.
    const a = document.createElement('a')
    a.href = url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.click()
    setSentUrl(url)
  }

  return (
    <section id="contact" className="contact" data-ground="ink" aria-labelledby="contact-title">
      <div className="contact__head">
        <h2 id="contact-title" className="contact__title">
          {t.contact.title}
        </h2>
        <p className="contact__lead">{t.contact.lead}</p>
        <a className="contact__instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
          <InstagramIcon className="contact__icon" />
          <span>
            {t.contact.instagram} <span className="contact__handle">@{INSTAGRAM_HANDLE}</span>
          </span>
        </a>
      </div>

      <form className="form" onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor={`${id}-name`}>{t.contact.name}</label>
          <input
            id={`${id}-name`}
            name="name"
            autoComplete="name"
            value={name}
            aria-invalid={error || undefined}
            aria-describedby={error ? `${id}-name-error` : undefined}
            onChange={(e) => {
              setName(e.target.value)
              if (error && e.target.value.trim()) setError(false)
            }}
          />
          {error && (
            <p id={`${id}-name-error`} className="field__error">
              {t.contact.nameError}
            </p>
          )}
        </div>

        <fieldset className="field field--choices">
          <legend>{t.contact.occasion}</legend>
          <div className="choices">
            {OCCASIONS.map((o) => (
              <label key={o} className="choice">
                <input type="radio" name="occasion" value={o} checked={occasion === o} onChange={() => setOccasion(o)} />
                <span>{t.contact.occasions[o]}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="field">
          <label htmlFor={`${id}-date`}>
            {t.contact.date} <span className="field__optional">({t.contact.optional})</span>
          </label>
          <input id={`${id}-date`} name="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="field">
          <label htmlFor={`${id}-message`}>
            {t.contact.message} <span className="field__optional">({t.contact.optional})</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={3}
            value={message}
            placeholder={t.contact.messagePlaceholder}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="form__submit">
          <button type="submit" className="button button--bone">
            <WhatsAppIcon className="button__icon" />
            {t.contact.submit}
          </button>
          <p className="form__note" aria-live="polite">
            {sentUrl ? (
              <a className="form__fallback" href={sentUrl} target="_blank" rel="noopener noreferrer">
                {t.contact.fallback}
              </a>
            ) : (
              t.contact.note
            )}
          </p>
        </div>
      </form>
    </section>
  )
}
