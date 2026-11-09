import { useCallback, useState } from "react";
import { AiVisionSection } from "./components/AiVisionSection";
import { AudienceSection } from "./components/AudienceSection";
import { BookingNotice } from "./components/BookingNotice";
import { DemoModal } from "./components/DemoModal";
import { EarlyAccessSection } from "./components/EarlyAccessSection";
import { FaqSection } from "./components/FaqSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorksSection } from "./components/HowItWorksSection";
import { Navigation } from "./components/Navigation";
import { ProductPreviewSection } from "./components/ProductPreviewSection";
import { Seo } from "./components/Seo";
import { bookingUrl, isBookingConfigured } from "./config/env";
import "./App.css";

export default function App() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [showBookingNotice, setShowBookingNotice] = useState(false);

  const openDemo = useCallback(() => {
    setShowBookingNotice(false);
    setIsDemoOpen(true);
  }, []);

  const closeDemo = useCallback(() => {
    setIsDemoOpen(false);
  }, []);

  const handleBookMeeting = useCallback(() => {
    if (isBookingConfigured) {
      window.open(bookingUrl, "_blank", "noopener,noreferrer");
      return;
    }

    setShowBookingNotice(true);
  }, []);

  return (
    <div className="app-shell" id="top">
      <Seo />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navigation onRequestDemo={openDemo} />
      <main id="main-content">
        <Hero
          onRequestDemo={openDemo}
          onBookMeeting={handleBookMeeting}
        />
        <AudienceSection />
        <FeaturesSection />
        <ProductPreviewSection />
        <HowItWorksSection onRequestDemo={openDemo} />
        <AiVisionSection />
        <EarlyAccessSection onRequestDemo={openDemo} />
        <FaqSection />
      </main>
      <Footer onRequestDemo={openDemo} />
      <DemoModal open={isDemoOpen} onClose={closeDemo} />
      <BookingNotice
        open={showBookingNotice}
        onClose={() => setShowBookingNotice(false)}
        onRequestDemo={openDemo}
      />
    </div>
  );
}
