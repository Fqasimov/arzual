"""Crop the owner's photos and export WebP sizes into public/looks/.

Run: python3 scripts/export-images.py   (needs Pillow)
Crops remove screenshot bars and app overlays from the source images.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets-src"
OUT = ROOT / "public" / "looks"
OUT.mkdir(parents=True, exist_ok=True)

# name: (source, crop box (l, t, r, b) or None, widths)
PHOTOS = {
    "ivory-stairs": ("ivory-stairs.jpg", (0, 0, 1170, 1428), (720, 1170)),
    "navy-detail": ("navy-detail.jpg", (0, 8, 1170, 1555), (720, 1170)),
    "navy-flatlay": ("navy-flatlay.jpg", (0, 0, 1146, 1552), (720, 1146)),
    "noir-back": ("noir-back.jpg", (0, 0, 1170, 1556), (720, 1170)),
    "bordeaux": ("bordeaux.jpg", (0, 0, 1168, 1549), (720, 1168)),
    "olive-tag": ("olive-tag.jpg", (0, 18, 1152, 1556), (720, 1152)),
    # Close-up details, cut from the photos above.
    "detail-pintuck": ("navy-detail.jpg", (330, 240, 860, 770), (530,)),
    "detail-lace": ("noir-back.jpg", (540, 640, 960, 1060), (420,)),
    "detail-jacquard": ("olive-tag.jpg", (40, 1000, 540, 1500), (500,)),
    "detail-pearls": ("olive-tag.jpg", (250, 380, 560, 690), (310,)),
}

for name, (src, box, widths) in PHOTOS.items():
    im = Image.open(SRC / src).convert("RGB")
    if box:
        im = im.crop(box)
    for w in widths:
        h = round(im.height * w / im.width)
        out = im.resize((w, h), Image.LANCZOS) if w != im.width else im
        out.save(OUT / f"{name}-{w}.webp", "WEBP", quality=82, method=6)
        print(f"{name}-{w}.webp", w, h)

# Social preview image.
og = Image.open(SRC / "ivory-stairs.jpg").convert("RGB").crop((0, 200, 1170, 814)).resize((1200, 630), Image.LANCZOS)
og.save(ROOT / "public" / "og.jpg", "JPEG", quality=84)
