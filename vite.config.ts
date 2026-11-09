import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command, mode, isPreview }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");

  return {
    plugins: [react()],
    base:
      command === "build" || isPreview
        ? env.VITE_BASE_PATH || "/serviceflow-marketing/"
        : "/",
  };
});
