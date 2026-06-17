# PAI — Landing Page

Marketing landing page for PAI, built with **Next.js (App Router) + TypeScript + Tailwind CSS**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Building UI with 21st.dev Magic

This repo is wired up with the [21st.dev Magic](https://21st.dev) MCP server (see `.mcp.json`).
When you open a Claude Code session, the `mcp__magic__*` tools load automatically and can
generate React/Tailwind components directly into `src/`.

Useful in-chat commands:

- `/ui <description>` — generate a new component
- `/21 <description>` — fetch component inspiration from 21st.dev
- `/logo <company>` — drop in a brand logo

The Magic API key is read from the `API_KEY` environment variable (configured in the web
environment, kept out of git).

## Project structure

```
src/app/        # App Router pages, layout, and global styles
public/          # Static assets
SKILLS/          # Project skills (e.g. animation-design)
```
