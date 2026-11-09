import { Scissors } from "lucide-react";

interface LogoProps {
  light?: boolean;
}

export function Logo({ light = false }: LogoProps) {
  return (
    <a
      className={`brand${light ? " brand-light" : ""}`}
      href="#top"
      aria-label="ServiceFlow AI home"
    >
      <span className="brand-mark" aria-hidden="true">
        <Scissors size={18} strokeWidth={2.2} />
      </span>
      <span className="brand-name">
        ServiceFlow <span className="brand-ai">AI</span>
      </span>
    </a>
  );
}
