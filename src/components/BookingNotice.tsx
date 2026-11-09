import { ArrowRight, CalendarClock, X } from "lucide-react";
import { bookingNoticeContent } from "../content/siteContent";

interface BookingNoticeProps {
  open: boolean;
  onClose: () => void;
  onRequestDemo: () => void;
}

export function BookingNotice({
  open,
  onClose,
  onRequestDemo,
}: BookingNoticeProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="booking-notice"
      role="region"
      aria-live="polite"
      aria-label="Meeting booking notice"
    >
      <span className="booking-notice-icon" aria-hidden="true">
        <CalendarClock size={20} />
      </span>
      <div className="booking-notice-copy">
        <strong>{bookingNoticeContent.title}</strong>
        <p>{bookingNoticeContent.message}</p>
        <button className="text-link" type="button" onClick={onRequestDemo}>
          {bookingNoticeContent.action}
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>
      <button
        className="booking-notice-close"
        type="button"
        onClick={onClose}
        aria-label={bookingNoticeContent.closeLabel}
      >
        <X size={17} />
      </button>
    </div>
  );
}
