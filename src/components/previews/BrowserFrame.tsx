import type { ReactNode } from "react";

interface BrowserFrameProps {
  children: ReactNode;
  label: string;
  className?: string;
}

export function BrowserFrame({
  children,
  label,
  className = "",
}: BrowserFrameProps) {
  return (
    <div
      className={`browser-frame ${className}`.trim()}
      role="group"
      aria-label={label}
    >
      <div className="browser-bar" aria-hidden="true">
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-dot" />
        <span className="browser-title">ServiceFlow workspace</span>
        <span className="browser-badge">Demo</span>
      </div>
      <div className="browser-content">{children}</div>
    </div>
  );
}
