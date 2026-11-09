import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { heroContent, navItems } from "../content/siteContent";
import { Logo } from "./Logo";

interface NavigationProps {
  onRequestDemo: () => void;
}

export function Navigation({ onRequestDemo }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const handleDesktop = () => {
      if (desktopQuery.matches) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleDesktop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleDesktop);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container nav">
        <Logo />

        <nav className="desktop-nav" aria-label="Primary navigation">
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="button button-primary nav-cta"
            type="button"
            onClick={onRequestDemo}
          >
            {heroContent.primaryCta}
          </button>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="mobile-menu" id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    className="mobile-nav-link"
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            className="button button-primary mobile-menu-cta"
            type="button"
            onClick={() => {
              setIsOpen(false);
              onRequestDemo();
            }}
          >
            {heroContent.primaryCta}
          </button>
        </div>
      )}
    </header>
  );
}
