import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://2d64afaa3566d4318821b093f59699e4@o4506502328483840.ingest.sentry.io/4506515549454336",
  integrations: [
    new Sentry.BrowserTracing({
      // TODO: Add deployed url to `tracePropagationTargets`
      tracePropagationTargets: ["localhost"],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
