# Redesign verification

## Passed
- Production build and ESLint.
- Live LeetCode solved counts and contest data; Codeforces profile and submission-derived solved counts. Observed 913 LeetCode / 219 Codeforces solved during verification.
- API outage simulation: uncached data shows unavailable/dashes; cached responses remain explicitly labeled as saved data.
- Original Yojana and Arim demo destinations return HTTP 200 and the expected Google Drive video titles. Existing GitHub destination returns HTTP 200.
- First visit uses original GIF in a viewport-height section with no modal and no scroll lock. Finished artwork settles on its poster; navigation/revisit within the session uses the poster immediately.
- Exactly one project article; next/previous, direct selection, arrow keys, horizontal dragging at mobile width.
- Timed carousel observation: same slide through 2561 ms, next slide at 3077 ms. Manual interaction resets timer; hover/focus/drag pause logic retained.
- Hidden-tab event simulation pauses for over 3 seconds and resumes afterward.
- Reduced-motion media-query simulation: poster artwork, static full SVG path, no automatic carousel advance after 3500 ms, no reveal transforms. CSS reduced-motion rules inspected.
- Scroll-linked path increases down-page (0.38 to 0.78) and retracts when scrolling upward (0.49); dimensions measured from actual section layout.
- All eight actual sketches; lazy-loaded WebP gallery previews and full-resolution originals in modal.
- Sketch viewer: previous/next, arrow keys, Escape, native modal focus containment, focus restoration, horizontal pointer drag at mobile width.
- Desktop, 820px tablet, 390px mobile, and 320px narrow viewport checks: no horizontal overflow.
- Browser console: no application warnings/errors in the tested portfolio flow.

## External limitation
The retained Piston compiler service at emkc.org/api/v2/piston/execute responds HTTP 401. Its route, editor, language selection, copy/reset controls, and request integration remain; service authorization requires separate backend/service configuration. No credentials are embedded in the frontend. The UI explains the execution failure.

## Notes
- Hidden-state, API outage, and reduced-motion simulations used a temporary local qa.html test harness, removed before delivery.
- Mobile gesture checks used pointer dragging at mobile viewport dimensions; physical iOS/Android device testing was not performed.
- No deployment or Git commit was made.

## Hero quality update

The supplied 960 × 540 GIF is preserved. The rendered animation uses a 1920 × 1080 WebP export with Lanczos resampling and mild edge sharpening; the held poster uses lossless WebP. The animation stops at the completed artwork before the original fade to blank. This improves display interpolation without claiming new detail beyond the source. Desktop rendering verified at 1440 × 810.

## Scroll thread correction

Replaced abrupt section joins with curved transitions through section padding. Mobile now alternates sides instead of using a straight left rail. Added a moving tip and spring smoothing; scroll reversal retracts the same path. Loop progression is strictly monotonic, and the final curl completes gradually rather than jumping at the bottom. Geometry uses actual content gutters and refreshes on font loading/resizing without mutating the shared scroll value. Verified desktop drawing progression (0.1907 → 0.3133) and reversal (0.2166), mobile at 390px, the sketch loop, contact clearance, and no horizontal overflow. Reduced motion shows the complete static line without its animated tip.

Horizontal scrolling was reverted at the user’s request. The vertical layout, scroll thread, gallery arrangement, and navigation are restored; the improved hero assets are retained.

## Floating elements

Added the supplied camera, movie clapperboard, light bulb, MacBook, and raccoon stickers as floating interludes, with the user’s exact captions. Original JPEGs are preserved and blend into the paper through CSS. The scroll thread measures each stable image anchor and passes through its center; image/caption bobbing does not change document geometry. Desktop (1280px) and mobile (390px) placement checked with no horizontal overflow. Reduced motion disables floating.

## Sticker clearance update

The line now curls around each sticker’s outer edge instead of crossing its center. Added interlude spacing and clearance for rotation, floating motion, and captions. Sampled the rendered cubic path against all five image anchors (with movement margins) and caption bounds at 1280px, 390px, and 320px: no intersections and no horizontal overflow. Original sticker images and captions remain intact.

## Interactive stickers

All five stickers are accessible buttons with a pop-out hover/focus effect and Click me cue; touch layouts keep the cue visible. Camera opens the supplied Fuji frame with a shutter flash, developing portfolio portrait, and Capture again replay. Film opens Rehearse with me and the corrected Sholay dialogue with a repeatable take. Other stickers show their existing caption. Native dialogs contain focus, close on Escape/backdrop/close button, restore focus, and restore page scrolling. Camera and film replay, keyboard activation, Escape, focus restoration, and centered 320px mobile layout verified. Reduced-motion CSS disables flash and entrance/develop animations.

## Raccoon facts and bulb night mode

Raccoon opens the user-supplied two paragraphs with bold/italic emphasis; the stray svg token was removed. Bulb toggles a dark viewport overlay with a warm pool of light anchored to its measured position, the supplied Light in the night JPEG animated with CSS, and an accessible lights-on control. No bulb GIF was present in the source folder. Scroll/resize tracking, Escape cleanup, repeat toggling, lights-on restoration, and 320px layout with no horizontal overflow verified. Reduced motion disables sway, glow pulsing, and fades.

## Loose doodle loops

The scroll thread circles each sticker two-and-a-half times with drifting radii and irregular curves. Captions moved below the loops, with extra breathing room. Section rails now have wider alternating bends. Rendered path sampled against all five anchors (with motion margins) and captions at 1280px, 820px, and 320px: no intersections or horizontal overflow. Scroll progression and existing sticker interactions retained.

## Hanging bulb animation

Replaced the sticker-positioned JPEG effect with a bulb descending from the top of the viewport, then lighting its surroundings. Uses the supplied lightbulb_glow_transparent.webm (1280×720), muted inline looping playback, with the supplied transparent PNG for reduced motion or video errors. Responsive video placement, softened glow edges, and top cord keep the animation integrated into the darkened portfolio. Verified playing WebM, mobile 320px with no overflow, and lights-on cleanup; build and lint passed.

## Laptop typing animation

Laptop opens the eight original transparent PNG frames from typing_transparent_frames.zip, played in sequence at 10 frames per second. All frames load before the animation starts; pause/play freezes and resumes the sequence. Reduced motion shows the first frame. Verified all eight images loaded, one visible frame at a time, pause state, mobile 320px dialog with no overflow, and Escape close. Original PNG transparency is preserved without re-encoding.
