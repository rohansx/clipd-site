# clipd Landing Page — Design Spec

## Overview

Rebuild the clipd landing page ("The AI Clipboard Daemon for Developers") from a single HTML file into an Astro 5 project with React islands for animated sections. Catppuccin Mocha theme throughout. Bold & immersive animation style using Aceternity UI components.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro 5 (static site generator, islands architecture) |
| Interactive islands | React 19 |
| Styling | Tailwind CSS 4, extended with Catppuccin Mocha palette |
| Animations | Framer Motion (Aceternity UI dependency) |
| UI Components | Aceternity UI (copy-paste into `src/components/ui/`) |
| Language | TypeScript |
| Fonts | JetBrains Mono, IBM Plex Mono, Fira Code (self-hosted) |

## Catppuccin Mocha Palette

All Aceternity components are re-themed with these colors:

| Role | Token | Hex |
|---|---|---|
| Background (deepest) | `crust` | `#11111b` |
| Background (raised) | `mantle` | `#181825` |
| Background (base) | `base` | `#1e1e2e` |
| Border | `surface0` | `#313244` |
| Border hover | `surface1` | `#45475a` |
| Muted text | `overlay0` | `#6c7086` |
| Secondary text | `subtext0` | `#a6adc8` |
| Primary text | `text` | `#cdd6f4` |
| Primary accent | `peach` | `#fab387` |
| Secondary accent | `mauve` | `#cba6f7` |
| Success / prompts | `green` | `#a6e3a1` |
| Commands | `blue` | `#89b4fa` |
| Errors / warnings | `red` | `#f38ba8` |
| Info | `teal` | `#94e2d5` |
| Highlight | `yellow` | `#f9e2af` |

## Page Sections (top to bottom)

### 1. Palette Bar (Astro — static)
- Thin 3px bar at the very top showing all Catppuccin accent colors
- Hover effect: odd stripes expand
- Pure CSS, zero JS

### 2. Nav (Astro — static)
- Fixed top, styled as terminal title bar
- Left: traffic-light dots (red/yellow/green) + logo `❯ ~/clipd · main`
- Right: tab-style links (`features`, `compare`, `arch`, `github`, `docs [SOON badge]`)
- Backdrop blur, `mantle` background

### 3. Hero (React — `client:load`)
**Aceternity components:** `AuroraBackground`, `ShootingStars`, `StarsBackground`, `TextGenerateEffect`, `FlipWords`, `MovingBorder`

- **Background:** Aurora effect with Catppuccin peach/mauve gradients + shooting star particles with teal/lavender trails over a stars background
- **Prompt line:** `❯ clipd --version // v0.1.0-alpha` in monospace
- **Title:** `TextGenerateEffect` — "Copy more. Switch less." fades in word by word
  - "more." in `peach`, "less." in `mauve`
- **Subtitle:** Static text + `FlipWords` cycling: "Like **Atuin** for your clipboard" → "Like **tmux** for your clipboard" → "Like **fzf** for your clipboard"
- **Install box:** `MovingBorder` wrapping the terminal box `$ brew install clipd [copy]`
- **Ghost button:** `> how it works` linking to architecture section
- **Platform icons:** macOS, Linux, Windows SVGs (static within the island)
- **ASCII art watermark:** Background decorative element, low opacity

### 4. Sell Line (React — `client:visible`)
**Aceternity components:** `TextGenerateEffect`

- Centered text block on `mantle` background
- Styled as code comments: `// the problem:`
- Text generates on scroll: "You copy **two things** from a docs page. You switch tabs **six times**. // clipboard hasn't evolved since 1973."

### 5. Demo Terminal (React — `client:visible`)
**Custom Framer Motion animations**

- Terminal window chrome (dots, title bar)
- Lines animate in with staggered delays (0.5s intervals)
- Shows multi-slot copy/paste workflow
- Blinking cursor at the end
- Replays animation each time scrolled into view

### 6. Features — 6 Cards (React — `client:visible`)
**Aceternity components:** `CardContainer`/`CardBody`/`CardItem` (3D Card), `GlowingEffect`, `MovingBorder`

- 3x2 grid with 1px gap (`surface0` border)
- Each card: 3D perspective tilt on hover via `CardContainer`
- Glowing border effect in each card's accent color:
  - Multi-Slot Hotkeys → `peach`
  - Terminal UI → `mauve`
  - Rich History → `teal`
  - Local AI → `blue`
  - Editor Protocol → `green`
  - E2E Sync → `red`
- Section header styled as Rust: `// impl Features`

### 7. Hotkeys (Astro — static)
- Two-column grid showing copy slots and paste/search keybinds
- Keyboard cap styling with 3D depth (CSS border-bottom shadow)
- Numbered keys highlighted in `peach`
- CSS-only fade-in on scroll via intersection observer

### 8. Compare Table (Astro — static)
- clipd vs Quip vs Maccy vs Paste vs CopyQ
- clipd column highlighted with `peach` text and `glow-peach` background
- Green dots for supported, muted dashes for unsupported
- CSS-only fade-in on scroll

### 9. Architecture (Astro — static)
- Two-column layout: ASCII diagram (left) + tech stack list (right)
- Diagram inside terminal window chrome (dots + filename bar)
- Stack items colored by Catppuccin role (CORE=peach, STORE=mauve, AI=blue, etc.)
- CSS-only fade-in on scroll

### 10. CTA (React — `client:visible`)
**Aceternity components:** `LampEffect`, `MovingBorder`

- `LampEffect` with peach-colored cone of light revealing "Stop switching tabs."
- Section tag: `// fn main()`
- Two install options: `brew install clipd` and `curl` one-liner, both with `MovingBorder`
- Links: github, docs, newsletter
- Subtle radial gradient glow behind

### 11. Footer (Astro — static)
- Monospace, minimal: `❯ clipd · MIT License · Built with Rust`
- Links: GitHub, Twitter, Discord

### 12. Bottom Palette Bar (Astro — static)
- Same as top, reversed color order

### 13. Tracing Beam (React — `client:load`)
**Aceternity components:** `TracingBeam`

- Wraps the entire page content (below nav)
- Glowing beam follows scroll position along left edge
- Catppuccin peach/mauve gradient on the beam

## File Structure

```
clipd/
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   └── fonts/
│       ├── JetBrainsMono-*.woff2
│       ├── IBMPlexMono-*.woff2
│       └── FiraCode-*.woff2
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── PaletteBar.astro
│   │   ├── Hero.tsx
│   │   ├── SellLine.tsx
│   │   ├── DemoTerminal.tsx
│   │   ├── Features.tsx
│   │   ├── Hotkeys.astro
│   │   ├── Compare.astro
│   │   ├── Architecture.astro
│   │   ├── CTA.tsx
│   │   ├── Footer.astro
│   │   └── TracingBeamWrapper.tsx
│   ├── components/ui/
│   │   ├── aurora-background.tsx
│   │   ├── shooting-stars.tsx
│   │   ├── stars-background.tsx
│   │   ├── text-generate-effect.tsx
│   │   ├── flip-words.tsx
│   │   ├── 3d-card.tsx
│   │   ├── glowing-effect.tsx
│   │   ├── moving-border.tsx
│   │   ├── lamp.tsx
│   │   └── tracing-beam.tsx
│   └── styles/
│       └── global.css
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-03-26-clipd-landing-page-design.md
```

## Animation Budget & Performance

| Concern | Target |
|---|---|
| Static sections (zero JS) | Nav, Palette Bars, Hotkeys, Compare, Architecture, Footer (~60% of page) |
| Hero hydration | `client:load` — immediate, above the fold |
| Other islands | `client:visible` — lazy, only when scrolled into view |
| Tracing Beam | `client:load` — needs to be active for full page scroll tracking |
| Total JS (gzipped) | <150KB (React ~45KB + Framer Motion ~40KB + components ~50KB) |
| Fonts | Self-hosted woff2, preloaded for critical weights |
| Lighthouse target | 90+ Performance, 100 Accessibility |

## Content

All content is ported directly from the existing `index.html`. No copy changes. The following text elements are new:

- `FlipWords` rotation: "Like Atuin for your clipboard" / "Like tmux for your clipboard" / "Like fzf for your clipboard"
- All other text, links, comparison data, hotkey mappings, and architecture diagram remain identical.

## Out of Scope

- No backend / API
- No CMS integration
- No analytics
- No i18n
- No blog
- No dark/light theme toggle (Catppuccin Mocha only)
- No mobile-specific animations (graceful degradation — static fallback on small screens)
