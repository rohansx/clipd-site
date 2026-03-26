import { motion } from "motion/react";
import { LampContainer } from "./ui/lamp";
import { Button as MovingBorderButton } from "./ui/moving-border";
import { useState } from "react";

function CopyBtn({ text }: { text: string }) {
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

export default function CTA() {
  return (
    <section id="install" className="relative bg-[#181825]">
      <LampContainer className="!bg-[#181825]">
        <motion.div
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="text-center"
        >
          <h2 className="font-mono text-[clamp(30px,4.5vw,48px)] font-bold tracking-[-2px] text-[#cdd6f4] mb-5">
            Stop switching tabs.
          </h2>

          <p className="text-sm text-[#a6adc8] mb-10 max-w-[460px] mx-auto leading-[1.7]">
            Install clipd in 10 seconds. Open source. Free forever.
            Hosted sync for teams launching soon.
          </p>

          <div className="max-w-[420px] mx-auto space-y-3">
            <MovingBorderButton
              borderRadius="6px"
              className="bg-[#181825] text-[#cdd6f4] border-[#313244] font-mono text-sm w-full"
              containerClassName="w-full h-auto"
              duration={3000}
            >
              <div className="flex items-center gap-2.5 px-5 py-3 w-full justify-center">
                <span className="text-[#a6e3a1]">$</span>
                <span className="text-[#89b4fa]">brew install</span>
                <span className="text-[#cdd6f4] font-bold">clipd</span>
                <CopyBtn text="brew install clipd" />
              </div>
            </MovingBorderButton>

            <div
              className="bg-[#11111b] border border-[#313244] rounded-md font-mono text-xs flex items-center gap-2 px-5 py-3 justify-center cursor-pointer hover:border-[#45475a] transition-colors"
            >
              <span className="text-[#a6e3a1]">$</span>
              <span className="text-[#89b4fa]">curl</span>
              <span className="text-[#cdd6f4]">-sSL clipd.dev/install</span>
              <span className="text-[#6c7086]">|</span>
              <span className="text-[#89b4fa]">sh</span>
              <CopyBtn text="curl -sSL clipd.dev/install | sh" />
            </div>
          </div>

          <div className="flex justify-center gap-8 mt-10">
            <a href="https://github.com/clipd" target="_blank" rel="noreferrer" className="font-mono text-xs text-[#6c7086] flex items-center gap-2 hover:text-[#bac2de] transition-colors no-underline">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              github
            </a>
            <a href="#" className="font-mono text-xs text-[#6c7086] flex items-center gap-2 hover:text-[#bac2de] transition-colors no-underline">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
              docs
            </a>
            <a href="#" className="font-mono text-xs text-[#6c7086] flex items-center gap-2 hover:text-[#bac2de] transition-colors no-underline">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              newsletter
            </a>
          </div>
        </motion.div>
      </LampContainer>
    </section>
  );
}
