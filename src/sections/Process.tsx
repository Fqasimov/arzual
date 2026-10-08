import { useLang } from '../i18n/lang'

/** Four steps hung on one gold cord, each knotted through a tag hole. */
export function Process() {
  const { t } = useLang()
  return (
    <section id="process" className="process" data-ground="bone" aria-labelledby="process-title">
      <h2 id="process-title" className="process__title">
        {t.process.title}
      </h2>
      <ol className="process__steps">
        {t.process.steps.map((step, i) => (
          <li key={i} className="step">
            <span className="step__hole" aria-hidden="true" />
            <span className="step__index" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__text">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
