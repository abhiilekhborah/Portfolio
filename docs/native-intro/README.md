# Native intro verification

React 19 / Vite 8. The current site had already switched from GIF to MP4; this update replaces that raster cover with `HeroLoader` and a static native composition behind it. The requested v3 reference exists in `New sources` (960×540, 116 frames, 5,780 ms, 3,116,703 bytes). The attached v4 supplied the higher-resolution portrait crop. No original line-art asset was found; the user approved the crop fallback.

## Payload

| Resource | Bytes |
| --- | ---: |
| Reference v3 GIF | 3,116,703 |
| Transparent portrait, 480×984 | 42,364 |
| Source Sans 3 bold subset | 3,032 |
| Source Sans 3 light italic subset | 1,960 |
| Source Sans 3 label subset | 2,820 |
| New image + fonts | **50,176** |

Assets are 98.4% smaller than the v3 GIF. Critical CSS adds approximately 4 KB uncompressed inline in HTML; no new runtime dependency was added. FontTools was used temporarily outside the project to subset fonts, and is not a project dependency. Font licensing is in `public/intro/FONT-LICENSE.txt`.

## Layout and animation

- Real HTML text, CSS rule, CSS/SVG paper texture, and one transparent portrait. The portrait is a luminance-to-alpha crop of the v4 final hold, cleaned and exported as WebP; it remains raster and cannot recover detail absent from the source.
- Stage retains 960:540 proportions and fits both viewport width and height. Portrait phone screens show centered paper around the complete, uncropped composition.
- CSS-only reveals: blank through 0.6 s, port at 0.65–1.15 s, role/rule at 1.1–1.7 s, portrait mask at 1.1–2.4 s, portrait deepening at 2–2.8 s, italic at 1.5–2.4 s, name/tagline at 2.9–3.3 s, hold until 5.1 s, 680 ms exit.
- If the page is not ready at 5.1 s, the completed composition holds until window load, then exits. This ensures removal requires both page readiness and the normal timeline finishing. Reduced motion shows the final composition for 600 ms plus a 150 ms fade.
- Loader has status/Loading text, receives no focus, installs no scroll lock, is removed, and is skipped on subsequent session visits.
- Skipped unnecessary scroll-thread sampling in reduced-motion mode; the static thread appearance is unchanged. This avoids blocking the short reduced-motion loader with geometry work.

## Verification

Production build tested in isolated desktop Chrome against localhost. External Google Fonts/profile requests were blocked to isolate local intro resources. `verification.json` records measurements. No uncaught page errors; no horizontal overflow at 360×640, 390×844, 768×1024, or 1440×900. A 960×540 capture was included for reference overlay. Explicit aspect ratios and a fixed loader preserve the hero footprint during removal.

All requested timestamps (0.9, 1.7, 2.4, 3.5, 5.5 seconds) have screenshots at all four viewports. Animation sampling was frozen using the Web Animations inspection API for reproducible captures; production playback remains CSS-only. `reference-*.png` are original GIF frames, `comparison-*.jpg` show reference above native, and `overlay-*.png` blend the reference and native 50/50. The comparisons demonstrate close layout alignment, not pixel identity: the cleaned crop, font rasterization, early portrait tone, and procedural grain differ from the original raster frames.

Measured DOM removal: 5,781.8 ms normal; 752.9 ms reduced motion. Repeat visits rendered zero loader nodes. Body overflow remained unset.

## First paint

Local production full-app first paint: 24–96 ms across viewports; 32 ms at 390×844. First contentful paint: 88–180 ms; 92 ms at 390×844. Paper paints before the timeline's intentional 650 ms first-ink delay.

A reconstructed isolated GIF baseline at 390×844 measured 24 ms first paint / 64 ms FCP (`baseline-paint.json`). It is not a historical production measurement and runs less application code, so it cannot establish a comparable first-paint speedup. The verified improvement is the 98.4% media payload reduction and removal of raster text/video decoding, not a claimed laboratory or mobile-network paint speedup. No physical-phone or throttled-network benchmark was performed.

Obsolete published GIFs, intro MP4s, and unused poster variants were removed. The user-supplied originals in ignored `New sources` were preserved for reference. The existing v4 poster remains only for the camera-sticker snapshot, which was not redesigned.

`npm run lint` and `npm run build` passed.
