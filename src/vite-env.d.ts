/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BOOKING_URL?: string;
  readonly VITE_DEMO_FORM_ENDPOINT?: string;
  readonly VITE_SITE_URL?: string;
  readonly VITE_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
