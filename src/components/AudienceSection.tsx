import { Droplets, Hand, Scissors, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { audienceContent } from "../content/siteContent";
import type { AudienceIcon } from "../content/siteContent";

const audienceIcons: Record<AudienceIcon, LucideIcon> = {
  scissors: Scissors,
  hand: Hand,
  sparkles: Sparkles,
  droplets: Droplets,
};

export function AudienceSection() {
  return (
    <section className="section audience" id="about" aria-labelledby="audience-title">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">{audienceContent.eyebrow}</span>
          <h2 className="section-title" id="audience-title">
            {audienceContent.title}
          </h2>
          <p className="section-description">{audienceContent.description}</p>
        </div>

        <div className="audience-grid">
          {audienceContent.items.map((item) => {
            const Icon = audienceIcons[item.icon];

            return (
              <article className="audience-card" key={item.title}>
                <span className="audience-icon" aria-hidden="true">
                  <Icon size={21} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
