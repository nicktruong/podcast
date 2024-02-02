import { firebaseConfigQueryString } from "./config";

const swUrl = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js?${firebaseConfigQueryString}`;

if ("serviceWorker" in navigator) {
  // Register a service worker hosted at the root of the
  // site using the default scope.
  navigator.serviceWorker.register(swUrl).then(
    (_registration) => {},
    /*catch*/ (error) => {
      console.error(`Service worker registration failed: ${error}`);
    }
  );
} else {
  console.error("Service workers are not supported.");
}
