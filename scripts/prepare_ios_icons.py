#!/usr/bin/env python3
"""Create iOS Home Screen icons from the project's 512px source icon."""

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/images/logos/logo-512.png"
OUT = ROOT / "public/images/icons"

OUT.mkdir(parents=True, exist_ok=True)
src = Image.open(SOURCE).convert("RGBA")

for size in (152, 167, 180):
    src.resize((size, size), Image.Resampling.LANCZOS).save(
        OUT / f"apple-touch-icon-{size}.png", optimize=True
    )

src.resize((192, 192), Image.Resampling.LANCZOS).save(
    OUT / "pwa-icon-192.png", optimize=True
)
src.resize((512, 512), Image.Resampling.LANCZOS).save(
    OUT / "pwa-icon-512.png", optimize=True
)

# Keep the artwork inside the maskable safe zone (roughly 80% of the canvas).
maskable = Image.new("RGBA", (192, 192), (51, 71, 86, 255))
maskable.alpha_composite(src.resize((150, 150), Image.Resampling.LANCZOS), (21, 21))
maskable.save(OUT / "pwa-icon-192-maskable.png", optimize=True)
