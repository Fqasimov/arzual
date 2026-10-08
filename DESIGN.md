---
name: Arzu Almazzadeh
description: The hang tag unfolded into a page, and a swatch book that dyes the page in each dress's colour.
colors:
  bone: "#e8e5e0"
  sand: "#948566"
  sand-ink: "#6b5f46"
  ink: "#1c1b18"
  ink-2: "#55514a"
  midnight: "#1a1e31"
  noir: "#131212"
  bordeaux: "#3b1114"
  olive: "#4e4c33"
  glint: "#e6d6ae"
  placeholder: "#d9d5ce"
  error: "#eab0a1"
typography:
  arzu:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "clamp(7rem, min(19.5vw, 31svh), 26rem)"
    fontWeight: 460
    lineHeight: 0.78
    letterSpacing: "-0.012em"
  display:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "clamp(2.5rem, 1.5rem + 3.1vw, 4.5rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.022em"
  headline:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3vw, 4.25rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  name:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "clamp(3rem, 1.4rem + 5.4vw, 6rem)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  name-wide:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "clamp(4rem, 2rem + 9vw, 11rem)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.4vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  field:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
  label:
    fontFamily: "Jost Variable, Jost, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 450
    letterSpacing: "0.24em"
rounded:
  none: "0"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  gap: "clamp(16px, 2vw, 28px)"
  header: "72px"
components:
  button-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    typography: "{typography.label}"
    padding: "0 28px"
    height: "54px"
  button-solid-hover:
    backgroundColor: "{colors.sand-ink}"
  button-bone:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "54px"
  tag:
    backgroundColor: "{colors.bone}"
    textColor: "{colors.sand-ink}"
    rounded: "{rounded.none}"
    padding: "6px 14px 6px 10px"
---

# Design System: Arzu Almazzadeh

## Overview

The brand already owned a world: a round badge with an interlaced AA monogram in sand gold on bone, and a hang tag where huge geometric-sans letters ("ARZU") run off a bone card, "ALMAZZADEH" is set small and spaced, and a "MADE IN AZERBAIJAN" label hangs from a braided gold cord. The site is that tag unfolded to page scale. The collection is the brand's swatch book: while a dress sits in the middle of the screen, the whole page is dyed in its colour.

The one authored moment is the opening. The monogram draws itself from the bottom of its teardrop upward, the way ink runs along the strokes (a Remotion composition, `src/remotion/`), the name rises under it, a gold cord draws out, and the bone sheet is swiped up to uncover the site, which rises from below.

Visitor mode is Persuade: every section is one tap from WhatsApp.

## Colors

- **Bone** `#e8e5e0`: the ground, sampled from the badge. Every quiet section sits on it.
- **Sand** `#948566`: the monogram's gold. Large letters (ARZU, step numbers), the monogram, and the 1px cord lines. Never for small text.
- **Sand ink** `#6b5f46`: sand deepened to pass contrast for small text on bone (labels, tag, hovers).
- **Ink** `#1c1b18` / **Ink 2** `#55514a`: text and secondary text on bone (Ink 2 is about 6:1).
- **Swatch grounds**: Midnight `#1a1e31`, Noir `#131212`, Bordeaux `#3b1114`, Olive `#4e4c33`, and Ink for the consultation and footer. Each re-points the role variables `--ground`, `--fg`, `--fg-2`, `--accent` and `--line` under `html[data-ground]`, so every component follows the dye.
- **Glint** `#e6d6ae`: only the wet front of the ink in the intro.
- **Placeholder** `#d9d5ce`: the frame behind a photograph while it loads.
- **Error** `#eab0a1`: form errors, on the ink ground only.

The dye is a 900ms `background-color` / `color` transition on the body and header; elements that set their own `--fg-2` colour carry the same transition so nothing lags behind.

## Typography

One family, Jost (variable, self-hosted via Fontsource, Latin, Latin Extended for Azerbaijani, Cyrillic for Russian). It is a near match for the tag's geometric capitals with the pointed A.

- **ARZU** (weight 460, line-height 0.78): the tag's letters at page scale, cropped by the bottom of the hero.
- **Display / headline / name** (weight 300, tight negative tracking): the large voice. Look names stay at or under 6rem except Noir, where the name is set wide behind the photograph.
- **Label** (12px, weight 450, +0.24em, capitals): the tag's "MADE IN AZERBAIJAN" voice. Cloth lines, form labels, buttons. Never above a heading.
- **Body** 17px / 1.6, measure held near 30ch to 36rem.

`lang` is set on `<html>` per language so capitals transform correctly (Azerbaijani dotted İ).

## Layout

- 12 columns, gutter `clamp(16px, 4vw, 56px)`, column gap `clamp(16px, 2vw, 28px)`.
- Hero: copy in columns 1 to 6, the photograph in 8 to 12 at viewport height, ARZU in the second row cropped by the section edge, ALMAZZADEH set vertically in column 7.
- Looks: one screen each, and each has its own arrangement (Midnight: close-up plus a hung flat-lay; Noir: name behind photo; Bordeaux and Olive: words centred beside the photograph on opposite sides).
- Details: a sticky heading beside four close-ups of different sizes.
- Process: four steps hung on one horizontal cord (vertical on phones).
- Below 900px everything stacks; the hero photo comes first and the primary action stays in the first viewport.

## Elevation & Depth

Flat. The only shadow is the intro sheet's lower edge (`0 28px 56px -24px`) as it lifts off the page. Depth otherwise comes from overlap: the Noir photograph lying over its name, the flat-lay overlapping the close-up on phones.

## Shapes

Square corners everywhere. Circles appear only as punched tag holes (the tag label, the process steps). Lines are 1px in the cord colour.

## Components

- **Buttons**: solid ink (primary, WhatsApp), line (secondary), bone (on dark grounds). 54px tall, label type, `scale(0.97)` on press over 160ms; hover only on fine pointers.
- **Link CTA**: label type over a 1px cord underline with an arrow that steps 5px on hover.
- **Tag**: bone label with a 1px border and a punched hole.
- **Language switch**: AZ / EN / RU buttons with `aria-pressed`, the active one underlined in the accent.
- **Form**: underline fields, chip radios for the occasion, the submit opens WhatsApp with the message composed in the visitor's language.
- **Picture**: frames unveil upward with `clip-path` (1250ms, `cubic-bezier(.77,0,.175,1)`) and settle from 1.08 scale, echoing the opening swipe.

## Do's and Don'ts

- Do keep the garments' own colours as the only saturated colour on the page.
- Do keep every claim to what the house has confirmed: no prices, dates, addresses or fabric composition.
- Do give any new look its own arrangement on the 12 columns, and its own ground under `html[data-ground]`.
- Don't add a second typeface, gradients, glass, rounded cards or drop shadows.
- Don't put labels above headings; the label voice belongs to cloth, tags and form fields.
- Don't animate hovers on touch, and keep the reduced-motion path (no swipe, no clip reveals, the mark shown complete).
