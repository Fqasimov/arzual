import { LOGO_PATH, LOGO_VIEWBOX } from './logo-path'

type Props = { className?: string; title?: string }

/** The interlaced AA monogram, traced from the brand's round badge. Fills with currentColor. */
export function Monogram({ className, title }: Props) {
  return (
    <svg
      className={className}
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}
