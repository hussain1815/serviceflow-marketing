function toHttpUrl(value: string | undefined): string {
  const trimmed = value?.trim();

  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return "";
    }

    return url.toString();
  } catch {
    return "";
  }
}

export const demoFormEndpoint = toHttpUrl(
  import.meta.env.VITE_DEMO_FORM_ENDPOINT,
);

export const isDemoFormConfigured = demoFormEndpoint.length > 0;

export const bookingUrl = toHttpUrl(import.meta.env.VITE_BOOKING_URL);

export const isBookingConfigured = bookingUrl.length > 0;

export const siteUrl = toHttpUrl(import.meta.env.VITE_SITE_URL).replace(
  /\/$/,
  "",
);

export const baseUrl = import.meta.env.BASE_URL;
