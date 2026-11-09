import { ArrowRight, CircleHelp } from "lucide-react";
import { earlyAccessContent } from "../content/siteContent";

interface EarlyAccessSectionProps {
  onRequestDemo: () => void;
}

export function EarlyAccessSection({ onRequestDemo }: EarlyAccessSectionProps) {
  return (
    <section
      className="section early-access"
      id="contact"
      aria-labelledby="early-access-title"
    >
      <div className="container">
        <div className="early-card">
          <div className="early-copy">
            <span className="eyebrow">{earlyAccessContent.eyebrow}</span>
            <h2 className="early-title" id="early-access-title">
              {earlyAccessContent.title}
            </h2>
            <p>{earlyAccessContent.description}</p>
          </div>

          <div className="early-actions">
            <button
              className="button button-primary button-large"
              type="button"
              onClick={onRequestDemo}
            >
              {earlyAccessContent.cta}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <a className="text-link" href="#faq">
              <CircleHelp size={16} aria-hidden="true" />
              {earlyAccessContent.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
