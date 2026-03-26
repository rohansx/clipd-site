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
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className={`ml-auto px-2.5 py-1 text-[11px] font-mono rounded border transition-all cursor-pointer ${
        copied
          ? "text-[#a6e3a1] border-[#a6e3a1] bg-[#a6e3a1]/10"
          : "text-[#6c7086] border-[#45475a] bg-[#313244] hover:text-[#cdd6f4] hover:bg-[#45475a]"
      }`}
    >
      {copied ? "copied!" : "copy"}
    </button>
  );
}

{/* Cat hugging clipboard — clear outlined line-art, light on dark */}
function ClipCat({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 80 72" width={size} height={size * 0.9} className={className}>
      {/* Clipboard board */}
      <rect x="32" y="12" width="26" height="36" rx="2.5"
        fill="none" stroke="#cdd6f4" strokeWidth="2"/>
      {/* Clipboard clip at top */}
      <rect x="39" y="9" width="12" height="7" rx="1.5"
        fill="none" stroke="#89b4fa" strokeWidth="1.8"/>
      {/* Clipboard lines */}
      <line x1="38" y1="25" x2="52" y2="25" stroke="#6c7086" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="38" y1="30" x2="50" y2="30" stroke="#6c7086" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="38" y1="35" x2="47" y2="35" stroke="#6c7086" strokeWidth="1.3" strokeLinecap="round"/>
      {/* Check mark on clipboard */}
      <path d="M38 40 L41 43 L47 37" fill="none" stroke="#a6e3a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Cat body — round, sitting behind clipboard */}
      <ellipse cx="30" cy="52" rx="20" ry="14"
        fill="none" stroke="#cdd6f4" strokeWidth="2"/>

      {/* Cat tail — curling up on the right */}
      <path d="M48 54 Q58 50 60 40 Q61 34 57 28"
        fill="none" stroke="#cdd6f4" strokeWidth="2" strokeLinecap="round"/>
      {/* Tail tip accent */}
      <circle cx="56.5" cy="28" r="2" fill="#b4befe" opacity="0.7"/>

      {/* Cat head */}
      <ellipse cx="24" cy="36" rx="15" ry="13"
        fill="none" stroke="#cdd6f4" strokeWidth="2"/>
      {/* Head fill to cover clipboard line behind */}
      <ellipse cx="24" cy="36" rx="14" ry="12" fill="#11111b"/>

      {/* Cat ears — triangles */}
      <path d="M13 28 L7 13 L20 24" fill="#11111b" stroke="#cdd6f4" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M35 28 L41 13 L28 24" fill="#11111b" stroke="#cdd6f4" strokeWidth="2" strokeLinejoin="round"/>
      {/* Inner ear pink */}
      <path d="M13 25 L9 16 L18 23" fill="none" stroke="#f5c2e7" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M35 25 L39 16 L30 23" fill="none" stroke="#f5c2e7" strokeWidth="1.2" strokeLinejoin="round"/>

      {/* Eyes — happy closed arcs ^_^ */}
      <path d="M17 34 Q19.5 30 22 34" fill="none" stroke="#89b4fa" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 34 Q28.5 30 31 34" fill="none" stroke="#89b4fa" strokeWidth="2" strokeLinecap="round"/>

      {/* Nose — small triangle */}
      <path d="M23 37.5 L24 39 L25 37.5" fill="#f38ba8" stroke="#f38ba8" strokeWidth="0.5" strokeLinejoin="round"/>

      {/* Mouth — w shape */}
      <path d="M24 39 Q22 41.5 20 41" fill="none" stroke="#cdd6f4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M24 39 Q26 41.5 28 41" fill="none" stroke="#cdd6f4" strokeWidth="1" strokeLinecap="round"/>

      {/* Whiskers */}
      <line x1="3" y1="34" x2="14" y2="36" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>
      <line x1="4" y1="39" x2="14" y2="38.5" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>
      <line x1="34" y1="36" x2="44" y2="34" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>
      <line x1="34" y1="38.5" x2="44" y2="39" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>

      {/* Front paws — hugging clipboard */}
      <ellipse cx="18" cy="56" rx="5.5" ry="3.5"
        fill="none" stroke="#cdd6f4" strokeWidth="1.5" transform="rotate(-10 18 56)"/>
      <ellipse cx="40" cy="53" rx="5.5" ry="3.5"
        fill="none" stroke="#cdd6f4" strokeWidth="1.5" transform="rotate(10 40 53)"/>
      {/* Paw pad details */}
      <circle cx="16.5" cy="56.5" r="1" fill="#f5c2e7" opacity="0.5"/>
      <circle cx="19" cy="57.5" r="1" fill="#f5c2e7" opacity="0.5"/>
      <circle cx="41" cy="53.5" r="1" fill="#f5c2e7" opacity="0.5"/>
      <circle cx="38.5" cy="54.5" r="1" fill="#f5c2e7" opacity="0.5"/>
    </svg>
  );
}

export { ClipCat };

export default function Hero() {
  const flipWords = ["Atuin", "tmux", "fzf"];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0">
        <AuroraBackground className="!bg-[#11111b]">
          <div />
        </AuroraBackground>
      </div>

      {/* Stars + shooting stars */}
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

      {/* Content — two-column layout */}
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 pt-40 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] items-center gap-16 lg:gap-20">
          {/* Left column — text + CTA */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-mono text-[14px] text-[#6c7086] mb-10 flex items-center gap-2.5"
            >
              <span className="text-[#a6e3a1]">❯</span>
              <ClipCat size={28} className="inline-block" />
              <span className="text-[#cdd6f4] font-bold text-[15px]">clipd</span>
              <span>--version // v0.1.0-alpha</span>
            </motion.div>

            <div className="mb-8">
              <TextGenerateEffect
                words="Copy more. Switch less."
                className="font-mono font-extrabold tracking-[-3px] !text-[clamp(48px,7vw,84px)] !leading-[1.05]"
                duration={0.5}
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="text-[16px] text-[#a6adc8] max-w-[540px] leading-[1.85] mb-14 font-light"
              style={{ fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace" }}
            >
              A Rust-native system daemon that replaces your OS clipboard
              with multi-slot hotkeys, searchable history, editor plugins,
              and local AI. Like{" "}
              <span className="text-[#cdd6f4] font-medium border-b border-dashed border-[#fab387]">
                <FlipWords words={flipWords} duration={3000} className="text-[#cdd6f4] font-medium" />
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
                className="bg-[#181825] text-[#cdd6f4] border-[#313244] font-mono text-sm px-6 py-3.5"
                containerClassName="h-auto"
                duration={3000}
              >
                <div className="flex items-center gap-3">
                  <span className="text-[#a6e3a1]">$</span>
                  <span className="text-[#89b4fa]">brew install</span>
                  <span className="text-[#cdd6f4] font-bold">clipd</span>
                  <CopyButton text="brew install clipd" />
                </div>
              </MovingBorderButton>

              <a
                href="#architecture"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#45475a] rounded-md text-[#bac2de] font-mono text-[13px] hover:border-[#cba6f7] hover:text-[#cdd6f4] hover:bg-[#cba6f7]/5 transition-all no-underline"
              >
                <span className="text-[#cba6f7]">{">"}</span> how it works
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-14 flex items-center gap-6"
            >
              <span className="text-[11px] text-[#6c7086] uppercase tracking-[1.5px]">works on</span>
              <div className="flex gap-4">
                <div className="text-[#6c7086] hover:text-[#bac2de] transition-colors" title="macOS">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </div>
                <div className="text-[#6c7086] hover:text-[#bac2de] transition-colors" title="Linux">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.368 1.884 1.564.777.2 1.605.065 2.272-.464.416-.33.602-.398.737-.536.136-.136.198-.267.336-.399.275-.263.6-.468.84-.601.24-.132.333-.267.468-.536.14-.271.06-.602-.064-.936-.267-.869-.53-1.284-.262-1.418a.256.256 0 01.065-.035c.39-.199.69-.464.793-.87.106-.403.068-.704-.003-1.003-.501-2.137-3.573-3.07-3.573-3.07s-.075-.134-.335-.268c.384-1.935.174-3.87-.266-5.17-.697-2.042-1.964-3.253-3.298-3.793a5.5 5.5 0 00-1.604-.399c-.333-.034-.67-.05-1.007-.05z"/></svg>
                </div>
                <div className="text-[#6c7086] hover:text-[#bac2de] transition-colors" title="Windows">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/></svg>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column — large cat mascot */}
          <div className="hidden lg:flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 1.0, ease: "easeOut" }}
              className="relative"
            >
              {/* Glow behind the cat */}
              <div
                className="absolute inset-0 -m-16 rounded-full blur-3xl opacity-[0.07]"
                style={{ background: "radial-gradient(circle, #89b4fa 0%, #b4befe 40%, transparent 70%)" }}
              />
              <ClipCat size={360} className="relative z-10 opacity-90" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
