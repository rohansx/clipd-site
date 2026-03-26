import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { GlowingEffect } from "./ui/glowing-effect";

const features = [
  { icon: "⌘", name: "Multi-Slot Hotkeys", desc: "Up to 9 named clipboard slots with modifier+key chords. Copy 3 things, switch tabs once, paste all 3.", color: "peach" },
  { icon: "█", name: "Terminal UI", desc: "ratatui-powered full-screen fuzzy search. Filter by app, content type, time range, or git repo.", color: "mauve" },
  { icon: "db", name: "Rich History", desc: "Every clip stored in SQLite with source app, URL, git repo, content type, and timestamp. A searchable database.", color: "teal" },
  { icon: "AI", name: "Local AI Engine", desc: "ONNX-powered content classification, PII detection, and semantic search. Auto-flag API keys. Nothing leaves your machine.", color: "blue" },
  { icon: "{}", name: "Editor Protocol", desc: "Unix socket + MCP server that editors talk to natively. Thin plugins for Sublime, VS Code, Neovim.", color: "green" },
  { icon: "🔒", name: "E2E Encrypted Sync", desc: "Sync clipboard across machines. Client-side AES-256-GCM encryption. Self-hostable server. Your data stays yours.", color: "red" },
] as const;

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  peach:  { bg: "rgba(250,179,135,0.08)", border: "rgba(250,179,135,0.12)", text: "#fab387" },
  mauve:  { bg: "rgba(203,166,247,0.08)", border: "rgba(203,166,247,0.12)", text: "#cba6f7" },
  teal:   { bg: "rgba(148,226,213,0.08)", border: "rgba(148,226,213,0.12)", text: "#94e2d5" },
  blue:   { bg: "rgba(137,180,250,0.08)", border: "rgba(137,180,250,0.12)", text: "#89b4fa" },
  green:  { bg: "rgba(166,227,161,0.08)", border: "rgba(166,227,161,0.12)", text: "#a6e3a1" },
  red:    { bg: "rgba(243,139,168,0.08)", border: "rgba(243,139,168,0.12)", text: "#f38ba8" },
};

export default function Features() {
  return (
    <section id="features" className="py-24 border-b border-[#313244] bg-[#181825]">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="text-center mb-16">
          <div className="font-mono text-xs text-[#6c7086] mb-4 flex items-center justify-center gap-2">
            <span className="text-[#585b70]">{"//"}</span>
            <span className="text-[#cba6f7]">impl</span>
            <span className="text-[#a6e3a1]">Features</span>
          </div>
          <h2 className="font-mono text-[clamp(26px,3.8vw,40px)] font-bold tracking-[-1.5px] text-[#cdd6f4] mb-3">
            Built for how developers actually work.
          </h2>
          <p className="text-sm text-[#a6adc8] max-w-[500px] mx-auto">
            Not another consumer clipboard app with a pretty icon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-[#313244] border border-[#313244] rounded-[10px] overflow-hidden">
          {features.map((f) => {
            const c = colorMap[f.color];
            return (
              <CardContainer key={f.name} className="w-full" containerClassName="p-0 w-full">
                <CardBody className="relative bg-[#1e1e2e] p-9 group/card transition-colors hover:bg-[#181825] w-full h-full">
                  <div className="absolute inset-0 rounded-none overflow-hidden">
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
                    <div
                      className="w-10 h-10 flex items-center justify-center rounded-lg text-sm font-mono font-bold border mb-4"
                      style={{
                        backgroundColor: c.bg,
                        borderColor: c.border,
                        color: c.text,
                      }}
                    >
                      {f.icon}
                    </div>
                  </CardItem>
                  <CardItem translateZ={30}>
                    <h3 className="font-mono font-semibold text-[15px] tracking-[-0.3px] text-[#cdd6f4] mb-2">
                      {f.name}
                    </h3>
                  </CardItem>
                  <CardItem translateZ={10}>
                    <p className="text-[13px] text-[#a6adc8] leading-[1.7] font-light">
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
