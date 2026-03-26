import { motion, useInView } from "motion/react";
import { useRef } from "react";

interface LinePart {
  text: string;
  cls: string;
}

interface DemoLine {
  type: "comment" | "cmd" | "empty";
  text?: string;
  parts?: LinePart[];
  cursor?: boolean;
}

const lines: DemoLine[] = [
  { type: "comment", text: "# copy two items without switching tabs" },
  { type: "cmd", parts: [
    { text: "❯", cls: "text-[#a6e3a1]" },
    { text: " select API key ", cls: "text-[#a6adc8]" },
    { text: "⌘+C", cls: "text-[#cba6f7]" },
    { text: " → slot 0 ✓", cls: "text-[#a6e3a1]" },
  ]},
  { type: "cmd", parts: [
    { text: "❯", cls: "text-[#a6e3a1]" },
    { text: " select endpoint ", cls: "text-[#a6adc8]" },
    { text: "⌘+⇧+", cls: "text-[#cba6f7]" },
    { text: "1", cls: "text-[#fab387] font-bold" },
    { text: " → slot 1 ✓", cls: "text-[#a6e3a1]" },
  ]},
  { type: "empty" },
  { type: "comment", text: "# switch to editor — paste both inline" },
  { type: "cmd", parts: [
    { text: "❯", cls: "text-[#a6e3a1]" },
    { text: " ⌘+V", cls: "text-[#cba6f7]" },
    { text: " ← pastes API key", cls: "text-[#a6adc8]" },
  ]},
  { type: "cmd", parts: [
    { text: "❯", cls: "text-[#a6e3a1]" },
    { text: " ⌘+⌥+", cls: "text-[#cba6f7]" },
    { text: "1", cls: "text-[#fab387] font-bold" },
    { text: " ← pastes endpoint", cls: "text-[#a6adc8]" },
  ]},
  { type: "empty" },
  { type: "cmd", parts: [
    { text: "❯", cls: "text-[#a6e3a1]" },
    { text: " clipd search", cls: "text-[#cdd6f4]" },
    { text: " --last 1h", cls: "text-[#89b4fa]" },
    { text: " # fuzzy TUI", cls: "text-[#6c7086] italic" },
  ], cursor: true },
];

export default function DemoTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section className="py-24 border-b border-[#313244]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#6c7086] mb-4 flex items-center justify-center gap-2">
            <span className="text-[#585b70]">{"//"}</span>
            <span className="text-[#cba6f7]">fn</span>
            <span className="text-[#a6e3a1]">demo</span>
            <span className="text-[#6c7086]">()</span>
          </div>
          <h2 className="font-mono text-[clamp(26px,3.8vw,40px)] font-bold tracking-[-1.5px] text-[#cdd6f4] mb-3">
            Multi-slot copy. Zero tab switches.
          </h2>
          <p className="text-sm text-[#a6adc8] max-w-[500px] mx-auto">
            Copy multiple items with numbered shortcuts. Paste them wherever.
          </p>
        </div>

        <div
          ref={ref}
          className="bg-[#1e1e2e] border border-[#313244] rounded-[10px] overflow-hidden max-w-[720px] mx-auto"
          style={{ boxShadow: "0 0 0 1px #313244, 0 24px 80px rgba(0,0,0,0.5), 0 0 60px rgba(203,166,247,0.03)" }}
        >
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#313244] bg-[#181825]">
            <span className="font-mono text-[11px] text-[#6c7086] ml-2 flex-1 text-center">
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
                    className="text-[#6c7086] italic"
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
                    <span
                      className="inline-block w-2 h-4 bg-[#fab387] rounded-[1px] ml-0.5 align-text-bottom"
                      style={{ animation: "blink 1s step-end infinite" }}
                    />
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
