# clipd Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the clipd landing page as an Astro 5 project with React islands, Catppuccin Mocha theme, and Aceternity UI animated components.

**Architecture:** Astro handles static sections (nav, hotkeys, compare, architecture, footer) as `.astro` components with zero client JS. Animated sections (hero, sell line, demo terminal, features, CTA) are React islands hydrated via `client:load` or `client:visible`. Aceternity UI components are installed via their shadcn registry and themed with Catppuccin colors. A `TracingBeam` wraps the full page content.

**Tech Stack:** Astro 5, React 19, Tailwind CSS 4, Framer Motion, Aceternity UI, TypeScript

**Spec:** `docs/superpowers/specs/2026-03-26-clipd-landing-page-design.md`

---

### Task 1: Scaffold Astro project with React + Tailwind

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tailwind.config.mjs`
- Create: `tsconfig.json`
- Create: `src/styles/global.css`
- Create: `src/layouts/Layout.astro`
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create Astro project**

```bash
cd /home/rsx/clipd
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

- [ ] **Step 2: Install dependencies**

```bash
cd /home/rsx/clipd
npm install
npx astro add react tailwind --yes
npm install framer-motion motion clsx tailwind-merge
```

- [ ] **Step 3: Configure Tailwind with Catppuccin palette**

Write `tailwind.config.mjs`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ctp: {
          crust: '#11111b',
          mantle: '#181825',
          base: '#1e1e2e',
          surface0: '#313244',
          surface1: '#45475a',
          surface2: '#585b70',
          overlay0: '#6c7086',
          overlay1: '#7f849c',
          overlay2: '#9399b2',
          subtext0: '#a6adc8',
          subtext1: '#bac2de',
          text: '#cdd6f4',
          lavender: '#b4befe',
          blue: '#89b4fa',
          sapphire: '#74c7ec',
          sky: '#89dceb',
          teal: '#94e2d5',
          green: '#a6e3a1',
          yellow: '#f9e2af',
          peach: '#fab387',
          maroon: '#eba0ac',
          red: '#f38ba8',
          mauve: '#cba6f7',
          pink: '#f5c2e7',
          flamingo: '#f2cdcd',
          rosewater: '#f5e0dc',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        body: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        aurora: 'aurora 60s linear infinite',
      },
      keyframes: {
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to: { backgroundPosition: '350% 50%, 350% 50%' },
        },
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 4: Write global CSS**

Write `src/styles/global.css`:

```css
@import "tailwindcss";

@font-face {
  font-family: 'JetBrains Mono';
  src: url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap');
}

@font-face {
  font-family: 'IBM Plex Mono';
  src: url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&display=swap');
}

*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: #11111b;
  color: #cdd6f4;
  font-family: 'IBM Plex Mono', 'JetBrains Mono', monospace;
  line-height: 1.7;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: #fab387;
  color: #11111b;
}

a {
  color: #fab387;
  text-decoration: none;
  transition: opacity 0.2s;
}

a:hover {
  opacity: 0.8;
}

/* Scanline overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  pointer-events: none;
  z-index: 9998;
}

/* Noise texture */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 9999;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #11111b; }
::-webkit-scrollbar-thumb { background: #45475a; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #585b70; }
```

- [ ] **Step 5: Write base layout**

Write `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
}
const { title } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="clipd — A Rust-native AI clipboard daemon for developers. Multi-slot hotkeys, searchable history, editor plugins, and local AI." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@300;400;500;600&family=Fira+Code:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <title>{title}</title>
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 6: Write placeholder index page**

Write `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="clipd — The AI Clipboard Daemon for Developers">
  <main>
    <h1 class="text-ctp-peach text-4xl font-mono p-8">clipd</h1>
    <p class="text-ctp-subtext0 font-body p-8">Landing page coming soon.</p>
  </main>
</Layout>
```

- [ ] **Step 7: Verify dev server runs**

```bash
cd /home/rsx/clipd && npx astro dev --port 4321
```

Expected: Dev server starts, page renders with "clipd" in peach color at `http://localhost:4321`.

- [ ] **Step 8: Commit**

```bash
cd /home/rsx/clipd
git init
echo "node_modules\ndist\n.astro\n.superpowers" > .gitignore
git add -A
git commit -m "feat: scaffold astro project with react, tailwind, catppuccin theme"
```

---

### Task 2: Install Aceternity UI components

**Files:**
- Create: `src/components/ui/aurora-background.tsx`
- Create: `src/components/ui/shooting-stars.tsx`
- Create: `src/components/ui/stars-background.tsx`
- Create: `src/components/ui/text-generate-effect.tsx`
- Create: `src/components/ui/flip-words.tsx`
- Create: `src/components/ui/3d-card.tsx`
- Create: `src/components/ui/glowing-effect.tsx`
- Create: `src/components/ui/moving-border.tsx`
- Create: `src/components/ui/lamp.tsx`
- Create: `src/components/ui/tracing-beam.tsx`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create utility function**

Write `src/lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Install Aceternity components via CLI**

```bash
cd /home/rsx/clipd
npx shadcn@latest add "https://ui.aceternity.com/r/aurora-background" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/shooting-stars" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/stars-background" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/text-generate-effect" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/flip-words" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/3d-card" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/glowing-effect" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/moving-border" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/lamp" --overwrite --yes 2>/dev/null || true
npx shadcn@latest add "https://ui.aceternity.com/r/tracing-beam" --overwrite --yes 2>/dev/null || true
```

If the CLI doesn't work for Astro, manually copy component source from the Aceternity UI website into `src/components/ui/`. Each component is a single `.tsx` file.

- [ ] **Step 3: Fix imports for Astro**

All Aceternity components use `"use client"` directive and import from `@/components/ui/` or `@/lib/utils`. Update tsconfig paths:

In `tsconfig.json`, ensure:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "jsx": "react-jsx"
  }
}
```

Remove any `"use client"` directives from copied components (Astro doesn't use them — hydration is controlled via `client:` directives in `.astro` files).

- [ ] **Step 4: Verify components import correctly**

```bash
cd /home/rsx/clipd && npx astro check
```

Expected: No TypeScript errors.

- [ ] **Step 5: Commit**

```bash
cd /home/rsx/clipd
git add -A
git commit -m "feat: install aceternity ui components and configure paths"
```

---

### Task 3: Build static Astro components (Nav, PaletteBar, Footer)

**Files:**
- Create: `src/components/PaletteBar.astro`
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write PaletteBar**

Write `src/components/PaletteBar.astro`:

```astro
---
interface Props {
  reverse?: boolean;
}
const { reverse = false } = Astro.props;
const colors = [
  'bg-ctp-red', 'bg-ctp-peach', 'bg-ctp-yellow', 'bg-ctp-green',
  'bg-ctp-teal', 'bg-ctp-blue', 'bg-ctp-lavender', 'bg-ctp-mauve',
  'bg-ctp-pink', 'bg-ctp-flamingo', 'bg-ctp-rosewater',
];
const ordered = reverse ? [...colors].reverse() : colors;
---
<div class="flex h-[3px] w-full overflow-hidden group">
  {ordered.map((c) => (
    <span class={`flex-1 transition-all duration-300 group-hover:odd:flex-[2] ${c}`} />
  ))}
</div>
```

- [ ] **Step 2: Write Nav**

Write `src/components/Nav.astro`:

```astro
---
---
<nav class="fixed top-0 left-0 right-0 z-[100] bg-ctp-mantle border-b border-ctp-surface0">
  <div class="max-w-[1100px] mx-auto px-8 flex items-center justify-between h-12">
    <div class="flex items-center">
      <div class="flex gap-1.5 mr-3">
        <div class="w-3 h-3 rounded-full bg-ctp-red"></div>
        <div class="w-3 h-3 rounded-full bg-ctp-yellow"></div>
        <div class="w-3 h-3 rounded-full bg-ctp-green"></div>
      </div>
      <div class="font-mono font-bold text-sm text-ctp-text flex items-center gap-2">
        <span class="text-ctp-green">❯</span>
        <span class="text-ctp-blue">~</span><span class="text-ctp-overlay0">/</span>clipd
        <span class="text-ctp-overlay0">·</span>
        <span class="text-ctp-mauve font-normal text-xs"> main</span>
      </div>
    </div>
    <ul class="flex h-12 list-none">
      <li><a href="#features" class="flex items-center h-full px-5 text-ctp-overlay1 text-xs font-mono tracking-wider border-l border-ctp-surface0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors">features</a></li>
      <li><a href="#compare" class="flex items-center h-full px-5 text-ctp-overlay1 text-xs font-mono tracking-wider border-l border-ctp-surface0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors">compare</a></li>
      <li><a href="#architecture" class="flex items-center h-full px-5 text-ctp-overlay1 text-xs font-mono tracking-wider border-l border-ctp-surface0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors">arch</a></li>
      <li><a href="https://github.com/clipd" target="_blank" class="flex items-center h-full px-5 text-ctp-overlay1 text-xs font-mono tracking-wider border-l border-ctp-surface0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors">github</a></li>
      <li><a href="#install" class="flex items-center h-full px-5 text-ctp-overlay1 text-xs font-mono tracking-wider border-l border-ctp-surface0 hover:text-ctp-text hover:bg-ctp-surface0 transition-colors">docs<span class="text-[9px] px-1.5 py-0.5 border border-ctp-surface1 text-ctp-yellow rounded ml-1.5">SOON</span></a></li>
    </ul>
  </div>
</nav>
```

- [ ] **Step 3: Write Footer**

Write `src/components/Footer.astro`:

```astro
---
---
<footer class="py-6 border-t border-ctp-surface0 bg-ctp-crust">
  <div class="max-w-[1100px] mx-auto px-8 flex justify-between items-center">
    <div class="font-mono text-xs text-ctp-overlay0">
      <span class="text-ctp-green">❯</span> clipd <span class="text-ctp-peach">·</span> MIT License <span class="text-ctp-peach">·</span> Built with Rust
    </div>
    <div class="flex gap-6">
      <a href="#" class="font-mono text-xs text-ctp-overlay0 hover:text-ctp-subtext1 transition-colors">GitHub</a>
      <a href="#" class="font-mono text-xs text-ctp-overlay0 hover:text-ctp-subtext1 transition-colors">Twitter</a>
      <a href="#" class="font-mono text-xs text-ctp-overlay0 hover:text-ctp-subtext1 transition-colors">Discord</a>
    </div>
  </div>
</footer>
```

- [ ] **Step 4: Wire into index.astro**

Update `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import PaletteBar from '../components/PaletteBar.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
---
<Layout title="clipd — The AI Clipboard Daemon for Developers">
  <PaletteBar />
  <Nav />
  <main class="pt-12">
    <div class="p-20 text-center">
      <p class="text-ctp-overlay0 font-mono">Sections coming next...</p>
    </div>
  </main>
  <Footer />
  <PaletteBar reverse />
</Layout>
```

- [ ] **Step 5: Verify in browser**

```bash
cd /home/rsx/clipd && npx astro dev --port 4321
```

Expected: Nav with traffic-light dots, palette bars at top/bottom, footer visible.

- [ ] **Step 6: Commit**

```bash
cd /home/rsx/clipd
git add src/components/PaletteBar.astro src/components/Nav.astro src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add nav, palette bar, and footer astro components"
```

---

### Task 4: Build Hero section (React island)

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Hero component**

Write `src/components/Hero.tsx`:

```tsx
import { AuroraBackground } from "./ui/aurora-background";
import { ShootingStars } from "./ui/shooting-stars";
import { StarsBackground } from "./ui/stars-background";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { FlipWords } from "./ui/flip-words";
import { Button as MovingBorderButton } from "./ui/moving-border";
import { motion } from "motion/react";
import { useState } from "react";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`ml-auto px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${
        copied
          ? "text-ctp-green border-ctp-green bg-ctp-green/10"
          : "text-ctp-overlay0 border-ctp-surface1 bg-ctp-surface0 hover:text-ctp-text hover:bg-ctp-surface1"
      }`}
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

export default function Hero() {
  const flipWords = ["Atuin", "tmux", "fzf"];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <AuroraBackground className="!bg-ctp-crust">
          <div />
        </AuroraBackground>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <ShootingStars
          starColor="#94e2d5"
          trailColor="#b4befe"
          minSpeed={10}
          maxSpeed={30}
          minDelay={4200}
          maxDelay={8700}
        />
        <StarsBackground
          starDensity={0.00015}
          allStarsTwinkle={true}
          twinkleProbability={0.7}
        />
      </div>

      {/* ASCII art watermark */}
      <div className="absolute top-24 right-[-40px] font-mono text-[11px] leading-[1.4] text-ctp-surface1 whitespace-pre pointer-events-none opacity-40 select-none hidden lg:block" aria-hidden="true">
{` ██████╗██╗     ██╗██████╗ ██████╗
██╔════╝██║     ██║██╔══██╗██╔══██╗
██║     ██║     ██║██████╔╝██║  ██║
██║     ██║     ██║██╔═══╝ ██║  ██║
╚██████╗███████╗██║██║     ██████╔╝
 ╚═════╝╚══════╝╚═╝╚═╝     ╚═════╝`}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-8 pt-40 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[13px] text-ctp-overlay0 mb-8 flex items-center gap-2"
        >
          <span className="text-ctp-green">❯</span>
          <span className="text-ctp-blue">clipd</span>
          <span className="text-ctp-overlay0">--version // v0.1.0-alpha</span>
        </motion.div>

        <div className="mb-7">
          <TextGenerateEffect
            words="Copy more. Switch less."
            className="font-mono font-extrabold tracking-[-3px] !text-[clamp(52px,7.5vw,88px)] !leading-[1.05]"
            duration={0.5}
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-[15px] text-ctp-subtext0 max-w-[540px] leading-[1.8] mb-12 font-light font-body"
        >
          A Rust-native system daemon that replaces your OS clipboard
          with multi-slot hotkeys, searchable history, editor plugins,
          and local AI. Like{" "}
          <span className="text-ctp-text font-medium border-b border-dashed border-ctp-peach">
            <FlipWords words={flipWords} duration={3000} className="text-ctp-text font-medium" />
            {" "}for your clipboard
          </span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex gap-4 items-center flex-wrap"
        >
          <MovingBorderButton
            borderRadius="6px"
            className="bg-ctp-mantle text-ctp-text border-ctp-surface0 font-mono text-sm px-5 py-3"
            containerClassName="h-auto"
            borderClassName="bg-[radial-gradient(var(--ctp-peach)_40%,transparent_60%)]"
            duration={3000}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-ctp-green">$</span>
              <span className="text-ctp-blue">brew install</span>
              <span className="text-ctp-text">clipd</span>
              <CopyButton text="brew install clipd" />
            </div>
          </MovingBorderButton>

          <a
            href="#architecture"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-ctp-surface1 rounded-md text-ctp-subtext1 font-mono text-[13px] hover:border-ctp-mauve hover:text-ctp-text hover:bg-ctp-mauve/5 transition-all"
          >
            <span className="text-ctp-mauve">{">"}</span> how it works
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-12 flex items-center gap-6"
        >
          <span className="text-[11px] text-ctp-overlay0 uppercase tracking-[1.5px]">works on</span>
          <div className="flex gap-4">
            <div className="text-ctp-overlay0 hover:text-ctp-subtext1 transition-colors" title="macOS">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            </div>
            <div className="text-ctp-overlay0 hover:text-ctp-subtext1 transition-colors" title="Linux">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.564.777.2 1.605.065 2.272-.464.416-.33.602-.398.737-.536.136-.136.198-.267.336-.399.275-.263.6-.468.84-.601.24-.132.333-.267.468-.536.14-.271.06-.602-.064-.936-.267-.869-.53-1.284-.262-1.418a.256.256 0 01.065-.035c.39-.199.69-.464.793-.87.106-.403.068-.704-.003-1.003-.501-2.137-3.573-3.07-3.573-3.07s-.075-.134-.335-.268c.384-1.935.174-3.87-.266-5.17-.697-2.042-1.964-3.253-3.298-3.793a5.5 5.5 0 00-1.604-.399c-.333-.034-.67-.05-1.007-.05z"/></svg>
            </div>
            <div className="text-ctp-overlay0 hover:text-ctp-subtext1 transition-colors" title="Windows">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add Hero to index.astro**

Update `src/pages/index.astro` to import and render the Hero:

```astro
---
import Layout from '../layouts/Layout.astro';
import PaletteBar from '../components/PaletteBar.astro';
import Nav from '../components/Nav.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero';
---
<Layout title="clipd — The AI Clipboard Daemon for Developers">
  <PaletteBar />
  <Nav />
  <main>
    <Hero client:load />
  </main>
  <Footer />
  <PaletteBar reverse />
</Layout>
```

- [ ] **Step 3: Verify Hero renders**

```bash
cd /home/rsx/clipd && npx astro dev --port 4321
```

Expected: Aurora background with shooting stars, text generates in, flip words cycle, moving border on install button.

- [ ] **Step 4: Commit**

```bash
cd /home/rsx/clipd
git add src/components/Hero.tsx src/pages/index.astro
git commit -m "feat: add hero section with aurora, shooting stars, text effects"
```

---

### Task 5: Build SellLine section (React island)

**Files:**
- Create: `src/components/SellLine.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write SellLine component**

Write `src/components/SellLine.tsx`:

```tsx
import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function SellLine() {
  return (
    <section className="py-20 border-b border-ctp-surface0 bg-ctp-mantle text-center">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="font-mono text-ctp-overlay0 italic mb-4 text-sm">{"// the problem:"}</div>
        <TextGenerateEffect
          words="You copy two things from a docs page. You switch tabs six times. The clipboard hasn't evolved since 1973."
          className="font-mono !text-[clamp(18px,2.8vw,28px)] !font-normal !text-ctp-subtext0 !leading-[1.7] !tracking-[-0.3px] max-w-[720px] mx-auto"
          duration={0.3}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to index.astro**

Add after Hero: `<SellLine client:visible />`

- [ ] **Step 3: Commit**

```bash
cd /home/rsx/clipd
git add src/components/SellLine.tsx src/pages/index.astro
git commit -m "feat: add sell line section with text generate effect"
```

---

### Task 6: Build DemoTerminal section (React island)

**Files:**
- Create: `src/components/DemoTerminal.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write DemoTerminal component**

Write `src/components/DemoTerminal.tsx`:

```tsx
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const lines = [
  { type: "comment", text: "# copy two items without switching tabs" },
  { type: "cmd", parts: [
    { text: "❯", cls: "text-ctp-green" },
    { text: " select API key ", cls: "text-ctp-subtext0" },
    { text: "⌘+C", cls: "text-ctp-mauve" },
    { text: " → slot 0 ✓", cls: "text-ctp-green" },
  ]},
  { type: "cmd", parts: [
    { text: "❯", cls: "text-ctp-green" },
    { text: " select endpoint ", cls: "text-ctp-subtext0" },
    { text: "⌘+⇧+", cls: "text-ctp-mauve" },
    { text: "1", cls: "text-ctp-peach font-bold" },
    { text: " → slot 1 ✓", cls: "text-ctp-green" },
  ]},
  { type: "empty" },
  { type: "comment", text: "# switch to editor — paste both inline" },
  { type: "cmd", parts: [
    { text: "❯", cls: "text-ctp-green" },
    { text: " ⌘+V", cls: "text-ctp-mauve" },
    { text: " ← pastes API key", cls: "text-ctp-subtext0" },
  ]},
  { type: "cmd", parts: [
    { text: "❯", cls: "text-ctp-green" },
    { text: " ⌘+⌥+", cls: "text-ctp-mauve" },
    { text: "1", cls: "text-ctp-peach font-bold" },
    { text: " ← pastes endpoint", cls: "text-ctp-subtext0" },
  ]},
  { type: "empty" },
  { type: "cmd", parts: [
    { text: "❯", cls: "text-ctp-green" },
    { text: " clipd search", cls: "text-ctp-text" },
    { text: " --last 1h", cls: "text-ctp-blue" },
    { text: " # fuzzy TUI", cls: "text-ctp-overlay0 italic" },
  ], cursor: true },
];

export default function DemoTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section className="py-24 border-b border-ctp-surface0">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-ctp-overlay0 mb-4 flex items-center justify-center gap-2">
            <span className="text-ctp-surface2">{"//"}</span>
            <span className="text-ctp-mauve">fn</span>
            <span className="text-ctp-green">demo</span>
            <span className="text-ctp-overlay0">()</span>
          </div>
          <h2 className="font-mono text-[clamp(26px,3.8vw,40px)] font-bold tracking-[-1.5px] text-ctp-text mb-3">
            Multi-slot copy. Zero tab switches.
          </h2>
          <p className="text-sm text-ctp-subtext0 max-w-[500px] mx-auto">
            Copy multiple items with numbered shortcuts. Paste them wherever.
          </p>
        </div>

        <div
          ref={ref}
          className="bg-ctp-base border border-ctp-surface0 rounded-[10px] overflow-hidden max-w-[720px] mx-auto shadow-[0_0_0_1px_var(--ctp-surface0),0_24px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(203,166,247,0.03)]"
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ctp-surface0 bg-ctp-mantle">
            <div className="w-3 h-3 rounded-full bg-ctp-red" />
            <div className="w-3 h-3 rounded-full bg-ctp-yellow" />
            <div className="w-3 h-3 rounded-full bg-ctp-green" />
            <span className="font-mono text-[11px] text-ctp-overlay0 ml-2 flex-1 text-center">
              clipd — multi-slot demo
            </span>
          </div>
          <div className="p-6 font-mono text-[13px] leading-[2] min-h-[260px]">
            {lines.map((line, i) => {
              if (line.type === "empty") {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: i * 0.4 + 0.3, duration: 0.3 }}
                  >
                    &nbsp;
                  </motion.div>
                );
              }
              if (line.type === "comment") {
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 4 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                    transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                    className="text-ctp-overlay0 italic"
                  >
                    {line.text}
                  </motion.div>
                );
              }
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 4 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                  transition={{ delay: i * 0.4 + 0.3, duration: 0.4 }}
                >
                  {line.parts!.map((part, j) => (
                    <span key={j} className={part.cls}>{part.text}</span>
                  ))}
                  {line.cursor && (
                    <span className="inline-block w-2 h-4 bg-ctp-peach rounded-[1px] ml-0.5 align-text-bottom animate-[blink_1s_step-end_infinite]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add blink keyframe to global.css**

Append to `src/styles/global.css`:

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
```

- [ ] **Step 3: Add to index.astro**

Add after SellLine: `<DemoTerminal client:visible />`

- [ ] **Step 4: Commit**

```bash
cd /home/rsx/clipd
git add src/components/DemoTerminal.tsx src/styles/global.css src/pages/index.astro
git commit -m "feat: add demo terminal section with staggered line animations"
```

---

### Task 7: Build Features section (React island with 3D cards)

**Files:**
- Create: `src/components/Features.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Features component**

Write `src/components/Features.tsx`:

```tsx
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { GlowingEffect } from "./ui/glowing-effect";

const features = [
  { icon: "⌘", name: "Multi-Slot Hotkeys", desc: "Up to 9 named clipboard slots with modifier+key chords. Copy 3 things, switch tabs once, paste all 3.", color: "peach" },
  { icon: "█", name: "Terminal UI", desc: "ratatui-powered full-screen fuzzy search. Filter by app, content type, time range, or git repo.", color: "mauve" },
  { icon: "db", name: "Rich History", desc: "Every clip stored in SQLite with source app, URL, git repo, content type, and timestamp. A searchable database.", color: "teal" },
  { icon: "AI", name: "Local AI Engine", desc: "ONNX-powered content classification, PII detection, and semantic search. Auto-flag API keys. Nothing leaves your machine.", color: "blue" },
  { icon: "{}", name: "Editor Protocol", desc: "Unix socket + MCP server that editors talk to natively. Thin plugins for Sublime, VS Code, Neovim.", color: "green" },
  { icon: "🔒", name: "E2E Encrypted Sync", desc: "Sync clipboard across machines. Client-side AES-256-GCM encryption. Self-hostable server. Your data stays yours.", color: "red" },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  peach:  { bg: "bg-ctp-peach/[0.08]",  border: "border-ctp-peach/[0.12]",  text: "text-ctp-peach",  glow: "from-ctp-peach/40" },
  mauve:  { bg: "bg-ctp-mauve/[0.08]",  border: "border-ctp-mauve/[0.12]",  text: "text-ctp-mauve",  glow: "from-ctp-mauve/40" },
  teal:   { bg: "bg-ctp-teal/[0.08]",   border: "border-ctp-teal/[0.12]",   text: "text-ctp-teal",   glow: "from-ctp-teal/40" },
  blue:   { bg: "bg-ctp-blue/[0.08]",   border: "border-ctp-blue/[0.12]",   text: "text-ctp-blue",   glow: "from-ctp-blue/40" },
  green:  { bg: "bg-ctp-green/[0.08]",  border: "border-ctp-green/[0.12]",  text: "text-ctp-green",  glow: "from-ctp-green/40" },
  red:    { bg: "bg-ctp-red/[0.08]",    border: "border-ctp-red/[0.12]",    text: "text-ctp-red",    glow: "from-ctp-red/40" },
};

export default function Features() {
  return (
    <section id="features" className="py-24 border-b border-ctp-surface0 bg-ctp-mantle">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-ctp-overlay0 mb-4 flex items-center justify-center gap-2">
            <span className="text-ctp-surface2">{"//"}</span>
            <span className="text-ctp-mauve">impl</span>
            <span className="text-ctp-green">Features</span>
          </div>
          <h2 className="font-mono text-[clamp(26px,3.8vw,40px)] font-bold tracking-[-1.5px] text-ctp-text mb-3">
            Built for how developers actually work.
          </h2>
          <p className="text-sm text-ctp-subtext0 max-w-[500px] mx-auto">
            Not another consumer clipboard app with a pretty icon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-ctp-surface0 border border-ctp-surface0 rounded-[10px] overflow-hidden">
          {features.map((f) => {
            const c = colorMap[f.color];
            return (
              <CardContainer key={f.name} className="w-full" containerClassName="p-0">
                <CardBody className="relative bg-ctp-base p-9 group/card transition-colors hover:bg-ctp-mantle w-full h-full">
                  <div className="absolute inset-0 rounded-none">
                    <GlowingEffect
                      spread={40}
                      glow={false}
                      disabled={false}
                      proximity={64}
                      inactiveZone={0.01}
                      borderWidth={2}
                    />
                  </div>
                  <CardItem translateZ={20}>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-mono font-bold border ${c.bg} ${c.border} ${c.text} mb-4`}>
                      {f.icon}
                    </div>
                  </CardItem>
                  <CardItem translateZ={30}>
                    <h3 className="font-mono font-semibold text-[15px] tracking-[-0.3px] text-ctp-text mb-2">
                      {f.name}
                    </h3>
                  </CardItem>
                  <CardItem translateZ={10}>
                    <p className="text-[13px] text-ctp-subtext0 leading-[1.7] font-light">
                      {f.desc}
                    </p>
                  </CardItem>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to index.astro**

Add after DemoTerminal: `<Features client:visible />`

- [ ] **Step 3: Verify 3D tilt and glow effects work on hover**

Expected: Cards tilt in 3D on mousemove, glowing border follows cursor.

- [ ] **Step 4: Commit**

```bash
cd /home/rsx/clipd
git add src/components/Features.tsx src/pages/index.astro
git commit -m "feat: add features section with 3d cards and glowing borders"
```

---

### Task 8: Build static sections (Hotkeys, Compare, Architecture)

**Files:**
- Create: `src/components/Hotkeys.astro`
- Create: `src/components/Compare.astro`
- Create: `src/components/Architecture.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write Hotkeys component**

Write `src/components/Hotkeys.astro` — port the hotkeys HTML from the existing `index.html`, converting to Tailwind classes using `ctp-*` color tokens. Use the same keyboard cap styling with 3D depth (`border-b-[3px]`), peach-highlighted number keys, and two-column grid layout. Add CSS-only intersection observer fade-in using the `fade-in` utility class.

Content is identical to the existing page: Copy Slots (⌘+C default, ⌘+⇧+1-9 slots) and Paste & Search (⌘+V default, ⌘+⌥+1 slot paste, ⌘+⇧+V history, ⌘+⌥+S overlay).

- [ ] **Step 2: Write Compare component**

Write `src/components/Compare.astro` — port the comparison table from the existing `index.html`. Convert to Tailwind with `ctp-*` tokens. clipd column highlighted with `text-ctp-peach` and `bg-ctp-peach/[0.08]`. Green dots (`text-ctp-green`), muted dashes (`text-ctp-surface2`), partial circles (`text-ctp-overlay1`).

Content identical: clipd vs Quip vs Maccy vs Paste vs CopyQ across 9 feature rows.

- [ ] **Step 3: Write Architecture component**

Write `src/components/Architecture.astro` — port the architecture section from the existing `index.html`. Two-column grid: left is ASCII diagram inside terminal chrome, right is colored stack items. Use `ctp-*` tokens for each layer color (CORE=peach, STORE=mauve, AI=blue, TUI=teal, IPC=green, SYNC=yellow, HOTKEYS=red, PLUGINS=pink).

Content identical to existing page.

- [ ] **Step 4: Add intersection observer fade-in script**

Add to `src/layouts/Layout.astro` before `</body>`:

```html
<script>
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
</script>
```

Add to `src/styles/global.css`:

```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 5: Add all three to index.astro**

Add after Features:
```astro
<Hotkeys />
<Compare />
<Architecture />
```

- [ ] **Step 6: Commit**

```bash
cd /home/rsx/clipd
git add src/components/Hotkeys.astro src/components/Compare.astro src/components/Architecture.astro src/pages/index.astro src/layouts/Layout.astro src/styles/global.css
git commit -m "feat: add hotkeys, compare, and architecture static sections"
```

---

### Task 9: Build CTA section with Lamp effect (React island)

**Files:**
- Create: `src/components/CTA.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write CTA component**

Write `src/components/CTA.tsx`:

```tsx
import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
import { Button as MovingBorderButton } from "./ui/moving-border";
import { useState } from "react";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`ml-auto px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${
        copied
          ? "text-ctp-green border-ctp-green bg-ctp-green/10"
          : "text-ctp-overlay0 border-ctp-surface1 bg-ctp-surface0 hover:text-ctp-text hover:bg-ctp-surface1"
      }`}
    >
      {copied ? "copied!" : label || "copy"}
    </button>
  );
}

export default function CTA() {
  return (
    <section id="install" className="relative bg-ctp-mantle border-b-0">
      <LampContainer className="!bg-ctp-mantle">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="text-center"
        >
          <div className="font-mono text-xs text-ctp-overlay0 mb-4 flex items-center justify-center gap-2">
            <span className="text-ctp-surface2">{"//"}</span>
            <span className="text-ctp-mauve">fn</span>
            <span className="text-ctp-green">main</span>
            <span className="text-ctp-overlay0">()</span>
          </div>

          <h2 className="font-mono text-[clamp(30px,4.5vw,48px)] font-bold tracking-[-2px] text-ctp-text mb-5">
            Stop switching tabs.
          </h2>

          <p className="text-sm text-ctp-subtext0 mb-10 max-w-[460px] mx-auto leading-[1.7]">
            Install clipd in 10 seconds. Open source. Free forever.
            Hosted sync for teams launching soon.
          </p>

          <div className="max-w-[420px] mx-auto space-y-3">
            <MovingBorderButton
              borderRadius="6px"
              className="bg-ctp-mantle text-ctp-text border-ctp-surface0 font-mono text-sm w-full"
              containerClassName="w-full h-auto"
              borderClassName="bg-[radial-gradient(var(--ctp-peach)_40%,transparent_60%)]"
              duration={3000}
            >
              <div className="flex items-center gap-2.5 px-5 py-3 w-full justify-center">
                <span className="text-ctp-green">$</span>
                <span className="text-ctp-blue">brew install</span>
                <span className="text-ctp-text">clipd</span>
                <CopyButton text="brew install clipd" />
              </div>
            </MovingBorderButton>

            <div className="bg-ctp-crust border border-ctp-surface0 rounded-md font-mono text-xs flex items-center gap-2 px-5 py-3 justify-center cursor-pointer hover:border-ctp-surface1 transition-colors"
              onClick={() => navigator.clipboard?.writeText("curl -sSL clipd.dev/install | sh")}
            >
              <span className="text-ctp-green">$</span>
              <span className="text-ctp-blue">curl</span>
              <span className="text-ctp-text">-sSL clipd.dev/install</span>
              <span className="text-ctp-overlay0">|</span>
              <span className="text-ctp-blue">sh</span>
              <CopyButton text="curl -sSL clipd.dev/install | sh" />
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-10">
            <a href="https://github.com/clipd" target="_blank" className="font-mono text-xs text-ctp-overlay0 flex items-center gap-2 hover:text-ctp-subtext1 transition-colors">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              github
            </a>
            <a href="#" className="font-mono text-xs text-ctp-overlay0 flex items-center gap-2 hover:text-ctp-subtext1 transition-colors">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              docs
            </a>
            <a href="#" className="font-mono text-xs text-ctp-overlay0 flex items-center gap-2 hover:text-ctp-subtext1 transition-colors">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              newsletter
            </a>
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
```

- [ ] **Step 2: Add to index.astro**

Add after Architecture: `<CTA client:visible />`

- [ ] **Step 3: Commit**

```bash
cd /home/rsx/clipd
git add src/components/CTA.tsx src/pages/index.astro
git commit -m "feat: add CTA section with lamp effect and moving border"
```

---

### Task 10: Add TracingBeam wrapper and finalize index.astro

**Files:**
- Create: `src/components/TracingBeamWrapper.tsx`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write TracingBeamWrapper**

Write `src/components/TracingBeamWrapper.tsx`:

```tsx
import { TracingBeam } from "./ui/tracing-beam";
import type { ReactNode } from "react";

export default function TracingBeamWrapper({ children }: { children: ReactNode }) {
  return (
    <TracingBeam className="px-0">
      {children}
    </TracingBeam>
  );
}
```

- [ ] **Step 2: Finalize index.astro with all sections**

Write final `src/pages/index.astro`:

```astro
---
import Layout from '../layouts/Layout.astro';
import PaletteBar from '../components/PaletteBar.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero';
import SellLine from '../components/SellLine';
import DemoTerminal from '../components/DemoTerminal';
import Features from '../components/Features';
import Hotkeys from '../components/Hotkeys.astro';
import Compare from '../components/Compare.astro';
import Architecture from '../components/Architecture.astro';
import CTA from '../components/CTA';
import Footer from '../components/Footer.astro';
import TracingBeamWrapper from '../components/TracingBeamWrapper';
---
<Layout title="clipd — The AI Clipboard Daemon for Developers">
  <PaletteBar />
  <Nav />
  <TracingBeamWrapper client:load>
    <main>
      <Hero client:load />
      <SellLine client:visible />
      <DemoTerminal client:visible />
      <Features client:visible />
      <Hotkeys />
      <Compare />
      <Architecture />
      <CTA client:visible />
    </main>
  </TracingBeamWrapper>
  <Footer />
  <PaletteBar reverse />
</Layout>
```

Note: If `TracingBeamWrapper` as a parent island causes issues with nested `client:` directives, flatten it — render TracingBeam alongside content rather than wrapping. In Astro, nested islands are supported but the inner islands must be passed as slots or rendered statically. Test and adjust.

- [ ] **Step 3: Build and verify**

```bash
cd /home/rsx/clipd && npx astro build
```

Expected: Clean build with no errors.

- [ ] **Step 4: Run dev server and verify full page**

```bash
cd /home/rsx/clipd && npx astro dev --port 4321
```

Expected: All sections render. Aurora + shooting stars in hero, text generates, flip words cycle, demo terminal animates, 3D cards tilt, lamp effect in CTA, tracing beam follows scroll.

- [ ] **Step 5: Commit**

```bash
cd /home/rsx/clipd
git add -A
git commit -m "feat: assemble complete landing page with tracing beam wrapper"
```

---

### Task 11: Polish and responsive fixes

**Files:**
- Modify: `src/styles/global.css`
- Modify: various components as needed

- [ ] **Step 1: Add responsive breakpoints**

Ensure all grids collapse on mobile:
- Features grid: `grid-cols-1 md:grid-cols-3`
- Hotkeys grid: `grid-cols-1 md:grid-cols-2`
- Architecture grid: `grid-cols-1 md:grid-cols-2`
- Hero ASCII art: `hidden lg:block`
- Nav tabs: consider hamburger or scrollable on small screens

- [ ] **Step 2: Disable heavy animations on mobile**

Add to `global.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Test at 320px, 768px, 1024px, 1440px widths**

Verify no horizontal overflow, text is readable, interactions work.

- [ ] **Step 4: Commit**

```bash
cd /home/rsx/clipd
git add -A
git commit -m "fix: responsive layout and reduced motion support"
```
