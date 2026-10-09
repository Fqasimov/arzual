import { srcSet, src, type Photo } from '../data/photos'

type Props = {
  photo: Photo
  alt: string
  sizes: string
  className?: string
  focus?: string
  eager?: boolean
}

/**
 * A photograph inside a frame that is unveiled upward (clip-path) the first time it
 * scrolls into view, echoing the swipe that opens the site.
 */
export function Picture({ photo, alt, sizes, className, focus, eager }: Props) {
  return (
    <div className={`picture reveal ${className ?? ''}`}>
      <picture>
        <source type="image/avif" srcSet={srcSet(photo, 'avif')} sizes={sizes} />
        <img
          src={src(photo)}
          srcSet={srcSet(photo)}
          sizes={sizes}
          width={photo.width}
          height={photo.height}
          alt={alt}
          // The files are small, so everything is fetched up front: a frame is never empty when it unveils.
          loading="eager"
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
          style={focus ? { objectPosition: focus } : undefined}
        />
      </picture>
    </div>
  )
}
