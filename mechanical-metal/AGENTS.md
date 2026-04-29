# AGENTS.md - Mechanical Metal Site

## Stack
- **Framework**: Astro 5 + Svelte 5
- **Language**: TypeScript
- **Dev port**: 4321

## Commands
```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build to ./dist/
npm run preview # Preview production build
```

## Architecture
- Pages: `src/pages/` (index.astro, 404.astro)
- Components: `src/components/` - mix of `.astro` and `.svelte` files
- Data: `src/data/skills.json`, `src/data/projects.json`
- Content: `src/content.config.ts` for Astro content collections

## Notes
- No test suite configured
- No lint/typecheck commands (Astro check available via `npx astro check`)
- Data lives in JSON files - edit those to update skills/projects
- Delete astro-intro.md if present (deprecated starter docs)