import {
  CalendarDays,
  ChartNoAxesCombined,
  Check,
  LayoutDashboard,
  Scissors,
  Users,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { featuresContent } from "../content/siteContent";
import type { FeatureIcon } from "../content/siteContent";

const featureIcons: Record<FeatureIcon, LucideIcon> = {
  calendar: CalendarDays,
  customers: Users,
  staff: UserRound,
  services: Scissors,
  dashboard: LayoutDashboard,
  reports: ChartNoAxesCombined,
};

export function FeaturesSection() {
  return (
    <section className="section features" id="features" aria-labelledby="features-title">
      <div className="container">
        <div className="section-header centered">
          <span className="eyebrow">{featuresContent.eyebrow}</span>
          <h2 className="section-title" id="features-title">
            {featuresContent.title}
          </h2>
          <p className="section-description">{featuresContent.description}</p>
        </div>

        <div className="features-grid">
          {featuresContent.items.map((feature) => {
            const Icon = featureIcons[feature.icon];

            return (
              <article className="feature-card" key={feature.title}>
                <span className="feature-icon" aria-hidden="true">
                  <Icon size={21} />
                </span>
                <h3>{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <ul className="feature-list">
                  {feature.bullets.map((bullet) => (
                    <li key={bullet}>
                      <Check size={14} aria-hidden="true" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
