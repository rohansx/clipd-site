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

{/* Cat hugging clipboard — clear outlined line-art */}
function ClipCat({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 80 72" width={size} height={size * 0.9} className={className}>
      <rect x="32" y="12" width="26" height="36" rx="2.5" fill="none" stroke="#cdd6f4" strokeWidth="2"/>
      <rect x="39" y="9" width="12" height="7" rx="1.5" fill="none" stroke="#89b4fa" strokeWidth="1.8"/>
      <line x1="38" y1="25" x2="52" y2="25" stroke="#6c7086" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="38" y1="30" x2="50" y2="30" stroke="#6c7086" strokeWidth="1.3" strokeLinecap="round"/>
      <line x1="38" y1="35" x2="47" y2="35" stroke="#6c7086" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M38 40 L41 43 L47 37" fill="none" stroke="#a6e3a1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <ellipse cx="30" cy="52" rx="20" ry="14" fill="none" stroke="#cdd6f4" strokeWidth="2"/>
      <path d="M48 54 Q58 50 60 40 Q61 34 57 28" fill="none" stroke="#cdd6f4" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="56.5" cy="28" r="2" fill="#b4befe" opacity="0.7"/>
      <ellipse cx="24" cy="36" rx="15" ry="13" fill="none" stroke="#cdd6f4" strokeWidth="2"/>
      <ellipse cx="24" cy="36" rx="14" ry="12" fill="#11111b"/>
      <path d="M13 28 L7 13 L20 24" fill="#11111b" stroke="#cdd6f4" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M35 28 L41 13 L28 24" fill="#11111b" stroke="#cdd6f4" strokeWidth="2" strokeLinejoin="round"/>
      <path d="M13 25 L9 16 L18 23" fill="none" stroke="#f5c2e7" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M35 25 L39 16 L30 23" fill="none" stroke="#f5c2e7" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M17 34 Q19.5 30 22 34" fill="none" stroke="#89b4fa" strokeWidth="2" strokeLinecap="round"/>
      <path d="M26 34 Q28.5 30 31 34" fill="none" stroke="#89b4fa" strokeWidth="2" strokeLinecap="round"/>
      <path d="M23 37.5 L24 39 L25 37.5" fill="#f38ba8" stroke="#f38ba8" strokeWidth="0.5" strokeLinejoin="round"/>
      <path d="M24 39 Q22 41.5 20 41" fill="none" stroke="#cdd6f4" strokeWidth="1" strokeLinecap="round"/>
      <path d="M24 39 Q26 41.5 28 41" fill="none" stroke="#cdd6f4" strokeWidth="1" strokeLinecap="round"/>
      <line x1="3" y1="34" x2="14" y2="36" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>
      <line x1="4" y1="39" x2="14" y2="38.5" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>
      <line x1="34" y1="36" x2="44" y2="34" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>
      <line x1="34" y1="38.5" x2="44" y2="39" stroke="#cdd6f4" strokeWidth="0.8" opacity="0.5"/>
      <ellipse cx="18" cy="56" rx="5.5" ry="3.5" fill="none" stroke="#cdd6f4" strokeWidth="1.5" transform="rotate(-10 18 56)"/>
      <ellipse cx="40" cy="53" rx="5.5" ry="3.5" fill="none" stroke="#cdd6f4" strokeWidth="1.5" transform="rotate(10 40 53)"/>
      <circle cx="16.5" cy="56.5" r="1" fill="#f5c2e7" opacity="0.5"/>
      <circle cx="19" cy="57.5" r="1" fill="#f5c2e7" opacity="0.5"/>
      <circle cx="41" cy="53.5" r="1" fill="#f5c2e7" opacity="0.5"/>
      <circle cx="38.5" cy="54.5" r="1" fill="#f5c2e7" opacity="0.5"/>
    </svg>
  );
}

export { ClipCat };

// Ratatui-style TUI clipboard manager
function HeroTUI() {
  const clipItems = [
    { icon: "►", iconCls: "text-[#89b4fa]", text: "House robber  1-D Dynamic Prog...", time: "11m ago", active: true },
    { icon: "📄", iconCls: "text-[#6c7086]", text: "Here's how to create your corpo...", time: "11m ago" },
    { icon: "📄", iconCls: "text-[#6c7086]", text: "tail -f ~/Library/Logs/clipd-d...", time: "13m ago" },
    { icon: "📄", iconCls: "text-[#6c7086]", text: "We are hiring for three positi...", time: "14m ago" },
    { icon: "📄", iconCls: "text-[#6c7086]", text: "Find Minimum in rotated sorted...", time: "17m ago" },
    { icon: "📄", iconCls: "text-[#6c7086]", text: "Search in rotated sorted array...", time: "24m ago" },
    { icon: "🔗", iconCls: "text-[#6c7086]", text: "https://github.com/shwetarkad...", time: "4h ago" },
    { icon: "📄", iconCls: "text-[#6c7086]", text: "What makes you one of the top...", time: "4h ago" },
    { icon: "🔗", iconCls: "text-[#6c7086]", text: "https://shwetakadam.github.io...", time: "4h ago" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
      className="w-full"
    >
      <div
        className="bg-[#11111b] border border-[#cba6f7] rounded-sm overflow-hidden font-mono"
        style={{ boxShadow: "0 0 0 1px #313244, 0 32px 100px rgba(0,0,0,0.6), 0 0 60px rgba(203,166,247,0.06)" }}
      >
        {/* Search bar */}
        <div className="border-b border-[#313244] px-3 py-1.5 flex items-center gap-2">
          <span className="text-[#fab387] text-[11px]">🔍</span>
          <span className="text-[#6c7086] text-[11px]">Search clips</span>
          <motion.span
            className="inline-block w-[1px] h-3.5 bg-[#cdd6f4]"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        {/* Main area — two panes */}
        <div className="flex text-[10px] leading-[1.7]">
          {/* Left pane — clip list */}
          <div className="flex-1 border-r border-[#313244]">
            <div className="px-2 py-1 text-[9px] text-[#6c7086] border-b border-[#313244] flex items-center gap-1">
              <span>📋</span> Clips (157)
            </div>
            {clipItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + i * 0.08, duration: 0.25 }}
                className={`px-2 py-[2px] flex items-center gap-1.5 whitespace-nowrap overflow-hidden ${
                  item.active
                    ? "bg-[#313244] text-[#cdd6f4]"
                    : "text-[#a6adc8]"
                }`}
              >
                <span className={`text-[9px] ${item.iconCls} shrink-0`}>{item.icon}</span>
                <span className="truncate">{item.text}</span>
                <span className="ml-auto text-[#89b4fa] shrink-0 text-[9px]">{item.time}</span>
              </motion.div>
            ))}
          </div>

          {/* Right pane — preview */}
          <div className="w-[45%] hidden sm:block">
            <div className="px-2 py-1 text-[9px] text-[#6c7086] border-b border-[#313244] flex items-center gap-1">
              <span>📄</span> text | sublime_text | id:152
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="px-3 py-2 text-[#a6adc8]"
            >
              <div className="text-[#cdd6f4]">House robber</div>
              <div className="text-[#6c7086] text-[9px] mt-1">1-D Dynamic Programming</div>
              <div className="text-[#585b70] text-[9px] mt-2">2/10/2025 &nbsp; slot 1</div>
              <div className="mt-3 border-t border-[#313244] pt-2">
                <div className="text-[#6c7086] text-[9px] mb-1">Preview:</div>
                <div className="text-[9px] text-[#a6adc8] leading-[1.6]">
                  <span className="text-[#cba6f7]">def</span> <span className="text-[#a6e3a1]">rob</span>(nums):
                  <br />
                  &nbsp;&nbsp;<span className="text-[#cba6f7]">if not</span> nums: <span className="text-[#cba6f7]">return</span> <span className="text-[#fab387]">0</span>
                  <br />
                  &nbsp;&nbsp;dp = [<span className="text-[#fab387]">0</span>] * len(nums)
                  <br />
                  &nbsp;&nbsp;dp[<span className="text-[#fab387]">0</span>] = nums[<span className="text-[#fab387]">0</span>]
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar — keybindings */}
        <div className="border-t border-[#313244] px-3 py-1.5 flex items-center gap-3 text-[9px] text-[#585b70]">
          <span><span className="text-[#6c7086]">↑↓</span> Navigate</span>
          <span><span className="text-[#6c7086]">Enter</span> Copy</span>
          <span><span className="text-[#6c7086]">Ctrl+D</span> Delete</span>
          <span><span className="text-[#6c7086]">Ctrl+U</span> Clear</span>
          <span><span className="text-[#6c7086]">Esc</span> Quit</span>
        </div>
      </div>
    </motion.div>
  );
}

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
                href="https://github.com/shwetarkadam/clipd"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#45475a] rounded-md text-[#bac2de] font-mono text-[13px] hover:border-[#cdd6f4] hover:text-[#cdd6f4] hover:bg-[#cdd6f4]/5 transition-all no-underline"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>

              <a
                href="#architecture"
                className="inline-flex items-center gap-2 px-5 py-3 text-[#6c7086] font-mono text-[13px] hover:text-[#cdd6f4] transition-colors no-underline"
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

          {/* Right column — ratatui TUI clipboard manager */}
          <div className="hidden lg:block">
            <HeroTUI />
          </div>
        </div>
      </div>
    </section>
  );
}
