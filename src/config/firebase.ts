export const firebaseConfig = {
  appId: process.env.REACT_APP_FIREBASE_APP_ID ?? "",
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ?? "",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN ?? "",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID ?? "",
};

export const firebaseConfigQueryString = new URLSearchParams(
  firebaseConfig
).toString();
