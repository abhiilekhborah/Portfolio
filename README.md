# Abhilekh Borah — Portfolio

Personal portfolio built with React, Vite, Tailwind CSS, and Framer Motion. Includes a scroll-drawn ink line, project carousel, live coding profiles, and a sketch gallery.

Live site: https://abhiilekhborah.github.io/Portfolio/

## Local development

```sh
npm install
npm run dev
```

## Check and deploy

```sh
npm run lint
npm run build
npm run deploy
```

Deployment publishes the built site to the `gh-pages` branch. Vite uses `/Portfolio/` as its public base path.

The code runner uses the existing external Piston service. Its execution endpoint currently requires service authorization. Coding-profile requests display cached data or an unavailable status when an upstream API cannot be reached.

Local design references and source documents in `New sources/` are excluded from version control.
