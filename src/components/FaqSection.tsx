import { ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import { faqContent } from "../content/siteContent";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq-grid">
        <div className="faq-intro">
          <span className="eyebrow">{faqContent.eyebrow}</span>
          <h2 className="section-title" id="faq-title">
            {faqContent.title}
          </h2>
          <p className="section-description">{faqContent.description}</p>

          <div className="faq-status">
            <Info size={18} aria-hidden="true" />
            <div>
              <strong>{faqContent.statusLabel}</strong>
              <p>{faqContent.statusText}</p>
            </div>
          </div>
        </div>

        <div className="faq-list">
          {faqContent.items.map((item, index) => {
            const isOpen = openIndex === index;
            const buttonId = `faq-question-${index}`;
            const panelId = `faq-answer-${index}`;

            return (
              <div
                className={`faq-item${isOpen ? " is-open" : ""}`}
                key={item.question}
              >
                <h3>
                  <button
                    className="faq-question"
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={19} aria-hidden="true" />
                  </button>
                </h3>
                {isOpen && (
                  <div
                    className="faq-answer"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                  >
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
