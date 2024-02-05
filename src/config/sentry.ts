import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      // TODO: Add deployed url to `tracePropagationTargets`
      tracePropagationTargets: ["localhost"],
    }),
    new Sentry.Replay({
      maskAllText: process.env.REACT_APP_SENTRY_REPLAY_MASK_TEXT === "true",
      blockAllMedia: process.env.REACT_APP_SENTRY_REPLAY_BLOCK_MEDIA === "true",
    }),
  ],
  tracesSampleRate: Number(
    process.env.REACT_APP_SENTRY_TRACES_SAMPLE_RATE ?? 0
  ),
  replaysSessionSampleRate: Number(
    process.env.REACT_APP_SENTRY_REPLAYS_SESSION_SAMPLE_RATE ?? 0
  ),
  replaysOnErrorSampleRate: Number(
    process.env.REACT_APP_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE ?? 0
  ),
  environment: process.env.NODE_ENV,
});
