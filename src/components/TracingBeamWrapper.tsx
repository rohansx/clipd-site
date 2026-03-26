import { TracingBeam } from "./ui/tracing-beam";
import React from "react";

export default function TracingBeamWrapper({ children }: { children: React.ReactNode }) {
  return (
    <TracingBeam className="px-0">
      {children}
    </TracingBeam>
  );
}
