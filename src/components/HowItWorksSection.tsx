import { ArrowRight } from "lucide-react";
import { howItWorksContent } from "../content/siteContent";

interface HowItWorksSectionProps {
  onRequestDemo: () => void;
}

export function HowItWorksSection({ onRequestDemo }: HowItWorksSectionProps) {
  return (
    <section
      className="section how-it-works"
      id="how-it-works"
      aria-labelledby="how-it-works-title"
    >
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">{howItWorksContent.eyebrow}</span>
          <h2 className="section-title" id="how-it-works-title">
            {howItWorksContent.title}
          </h2>
          <p className="section-description">
            {howItWorksContent.description}
          </p>
        </div>

        <div className="steps-grid">
          {howItWorksContent.steps.map((step) => (
            <article className="step-card" key={step.number}>
              <span className="step-number" aria-hidden="true">
                {step.number}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>

        <div className="section-cta">
          <button
            className="button button-primary button-large"
            type="button"
            onClick={onRequestDemo}
          >
            {howItWorksContent.cta}
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
