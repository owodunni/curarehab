import { handleErrorWithSentry, init } from "@sentry/sveltekit";

init({
  dsn: "https://90483a7b8bc7e5ba40788d37ce4c5800@o4504931376758784.ingest.de.sentry.io/4509536456867840",
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
