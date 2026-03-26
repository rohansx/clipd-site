import { TextGenerateEffect } from "./ui/text-generate-effect";

export default function SellLine() {
  return (
    <section className="py-20 border-b border-[#313244] bg-[#181825] text-center">
      <div className="max-w-[1100px] mx-auto px-8">
        <div className="font-mono text-[#6c7086] italic mb-4 text-sm">{"// the problem:"}</div>
        <TextGenerateEffect
          words="You copy two things from a docs page. You switch tabs six times. The clipboard hasn't evolved since 1973."
          className="font-mono !text-[clamp(18px,2.8vw,28px)] !font-normal !text-[#a6adc8] !leading-[1.7] !tracking-[-0.3px] max-w-[720px] mx-auto"
          duration={0.3}
        />
      </div>
    </section>
  );
}
