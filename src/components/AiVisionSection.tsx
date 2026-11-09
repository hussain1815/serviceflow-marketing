import { Info, Sparkles } from "lucide-react";
import { aiVisionContent } from "../content/siteContent";

export function AiVisionSection() {
  return (
    <section
      className="section ai-section"
      id="ai-vision"
      aria-labelledby="ai-vision-title"
    >
      <div className="container">
        <div className="ai-panel">
          <div className="ai-copy">
            <span className="eyebrow eyebrow-light">
              <Sparkles size={13} aria-hidden="true" />
              {aiVisionContent.eyebrow}
            </span>
            <h2 className="ai-title" id="ai-vision-title">
              {aiVisionContent.title}
            </h2>
            <p className="ai-description">{aiVisionContent.description}</p>
            <p className="ai-note">
              <Info size={16} aria-hidden="true" />
              {aiVisionContent.note}
            </p>
          </div>

          <div className="ai-card">
            <span className="ai-card-icon" aria-hidden="true">
              <Sparkles size={22} />
            </span>
            <h3>{aiVisionContent.cardTitle}</h3>
            <p>{aiVisionContent.cardDescription}</p>
            <dl className="ai-card-rows">
              {aiVisionContent.cardRows.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
