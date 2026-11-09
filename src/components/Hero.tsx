import { ArrowRight, CalendarClock, Eye, Sparkles } from "lucide-react";
import { heroContent } from "../content/siteContent";
import { BrowserFrame } from "./previews/BrowserFrame";
import { DashboardMock } from "./previews/DashboardMock";

interface HeroProps {
  onRequestDemo: () => void;
  onBookMeeting: () => void;
}

export function Hero({ onRequestDemo, onBookMeeting }: HeroProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <Sparkles size={13} aria-hidden="true" />
            {heroContent.eyebrow}
          </span>
          <h1 id="hero-title">
            {heroContent.titleLead}
            <span>{heroContent.titleAccent}</span>
          </h1>
          <p className="hero-description">{heroContent.description}</p>

          <div className="hero-actions">
            <button
              className="button button-primary button-large"
              type="button"
              onClick={onRequestDemo}
            >
              {heroContent.primaryCta}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            <button
              className="button button-secondary button-large"
              type="button"
              onClick={onBookMeeting}
            >
              <CalendarClock size={17} aria-hidden="true" />
              {heroContent.secondaryCta}
            </button>
          </div>

          <p className="hero-note">{heroContent.note}</p>
        </div>

        <div className="hero-visual">
          <div className="preview-caption">
            <Eye size={14} aria-hidden="true" />
            <span>{heroContent.previewLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{heroContent.previewNote}</span>
          </div>
          <BrowserFrame label="Illustrative ServiceFlow dashboard preview using demonstration data.">
            <DashboardMock />
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}
