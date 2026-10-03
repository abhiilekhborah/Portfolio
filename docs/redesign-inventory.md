# Portfolio redesign inventory

Inspected the working tree and HEAD before editing; pre-existing user changes retained as the starting point.

- React 19 / Vite 8, Tailwind 4, Framer Motion 12 already available. No animation dependency required.
- Portfolio is a single page; `#/compiler` retains the existing multi-language Piston compiler route.
- Working-tree content lives in `src/data/portfolioData.js`; original HEAD additionally contains Oxford Flowers, HTML/CSS, TensorFlow, Web Development and Data Science.
- Original working demo links in HEAD: Yojana `1Ty7ctoCpFRQLo_IOG8MIleYIWKUW3otJ`; Arim `1LAoZlFC4Vm0-yRD1IYYCJlZM_Kz5udyS`. Working-tree data had substituted unverified URLs. Restore original links.
- Existing live endpoints: leetcode-api-faisalshohag.vercel.app/{handle}, alfa-leetcode-api.onrender.com/{handle}/contest, codeforces.com/api/user.info, codeforces.com/api/user.status. Preserve all four; eliminate hardcoded fallback statistics and label actual cached data.
- Contact/profile links: existing email, GitHub, LinkedIn, LeetCode, Codeforces retained.
- Experience checked against `New sources/Take_info_for_my_cv.pdf`: Advenx internship March 16–September 16, 2026; ML/DL/GenAI workshop September 7–28, 2025. Replace inflated internship claims with CV wording.
- Hero: supplied 960×540 GIF, 116 frames, 5780 ms. Final frame is blank; frame 100 contains finished artwork. Use original GIF then settle on frame 100; reduced-motion and repeat session use that poster.
- Sketches: eight actual drawings, existing JPEG conversions from original JPG/HEIC files. Keep originals, create smaller WebP gallery previews.
- References: somehowliving.tech scroll-following line; Inspiration1.jpeg browser framing; project inspiration wireframes; sketch inspiration loose-page gallery; compiler wireframe inspiration.
- Previous implementation: blocking fixed intro, list of project cards, wrong section order, hardcoded statistics, very heavy framing, custom cursor, no focus trap in sketch viewer. Replace presentation and correct interactions.
