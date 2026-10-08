# Arzu Almazzadeh

One-page site for the Arzu Almazzadeh couture label. Azerbaijani by default, with English and Russian.

The design takes the brand's own hang tag as its world: a bone card, sand-gold letters cropped by the edge, one gold cord. The collection works like a swatch book: while a dress is in the middle of the screen, the whole page takes on its colour. See `DESIGN.md` for the system and `PRODUCT.md` for what the site is for.

## The intro

The monogram draws itself upward from the bottom of its teardrop, as if ink were running along the strokes. Then the name rises, a gold cord draws out, and the bone sheet is swiped up to uncover the site.

- It is a **Remotion** composition (`src/remotion/LogoIntro.tsx`). The site plays it with `@remotion/player`, and the swipe is done with the Web Animations API (`src/components/Intro.tsx`).
- The drawing uses an "ink-flow" map (`src/brand/logo-flow.png`). For every pixel of the monogram it stores how far ink has to travel along the strokes from the teardrop, and the vector path keeps the edges sharp. Both files come from `scripts/trace-logo.py`, which traces the original logo screenshot.
- It plays once per browser session. A click, key press, scroll or touch skips straight to the swipe. With reduced motion, the mark appears already drawn and the sheet fades away.
- The intro is a separate chunk, so returning visitors never download Remotion.

The same composition also renders as a vertical video for Instagram: `media/arzu-intro-reel.mp4` (1080×1920, 5 s). To render it again:

```bash
npm run render:intro      # writes out/arzu-intro.mp4
npm run studio            # opens Remotion Studio to adjust timing
```

Remotion is free for individuals and companies of up to three people. Larger companies need a company license (remotion.dev/license).

## Run it

```bash
npm install
npm run dev       # local development
npm run build     # static build into dist/
npm run preview   # serve the build
```

The build is static and uses relative paths, so `dist/` can go on any host (Netlify, Vercel, GitHub Pages, a plain web server).

## Before going live

- **WhatsApp number.** Set `WHATSAPP_NUMBER` in `src/lib/contact.ts` in international format, digits only (for example `994501234567`). Until it is set, the buttons open WhatsApp's share sheet with the message already written.
- **Copy to confirm.** All three languages are in `src/i18n/copy.ts`. Please check:
  - the fabrics are described as "satin" (atlaz / атлас), as the photos show. The composition, for example silk, is not stated.
  - the "made in Azerbaijan, for one woman" promise (made to measure).
  - the look names (Gecə mavisi, Qara, Bordo, Zeytun), which are working names.
  - the pearls on the olive look, and the four process steps.
- No prices, address, opening hours or lead times appear anywhere, on purpose.

## What's where

| Path | What it is |
| --- | --- |
| `src/remotion/` | The intro composition, the ink canvas and the timing. `index.ts` is the Remotion CLI entry. |
| `src/components/Intro.tsx` | Plays the composition in the page, then swipes the sheet up. |
| `src/sections/` | Hero, collection, details, process, consultation form and footer. |
| `src/i18n/` | All copy in AZ / EN / RU, and the language switch (remembered, or `?lang=en`). |
| `src/data/photos.ts` | Photos, their sizes, and which look they belong to. |
| `src/styles.css` | Tokens, the per-dress grounds (`html[data-ground=…]`) and all layout. |
| `assets-src/` | The owner's original photos and logo screenshot. |
| `scripts/export-images.py` | Crops the originals and writes the WebP sizes into `public/looks/`. |
| `scripts/trace-logo.py` | Traces the logo into `src/brand/logo-path.ts` and `src/brand/logo-flow.png`. |

## Adding a look

1. Put the photo in `assets-src/`, add it to `PHOTOS` in `scripts/export-images.py` and run `npm run images`.
2. Add it to `LOOKS` in `src/data/photos.ts` and give it copy in `src/i18n/copy.ts` (all three languages).
3. Give it a ground colour in `src/styles.css` (`html[data-ground='<id>']`) and its own arrangement under "Looks".
