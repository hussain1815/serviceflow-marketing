import { ArrowRight } from "lucide-react";
import { baseUrl } from "../config/env";
import { footerContent, navItems } from "../content/siteContent";
import { Logo } from "./Logo";

interface FooterProps {
  onRequestDemo: () => void;
}

export function Footer({ onRequestDemo }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo light />
            <p className="footer-description">
              {footerContent.brandDescription}
            </p>
            <p className="footer-markets">{footerContent.markets}</p>
            <p className="footer-note">{footerContent.legalNote}</p>
          </div>

          <div className="footer-column">
            <h2 className="footer-heading">{footerContent.productHeading}</h2>
            <ul className="footer-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a className="footer-link" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a className="footer-link" href="#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2 className="footer-heading">{footerContent.contactHeading}</h2>
            <p className="footer-contact-text">{footerContent.contactText}</p>
            <button
              className="button footer-button"
              type="button"
              onClick={onRequestDemo}
            >
              {footerContent.contactCta}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} ServiceFlow AI. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href={`${baseUrl}privacy.html`}>{footerContent.privacyLabel}</a>
            <a href={`${baseUrl}terms.html`}>{footerContent.termsLabel}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
