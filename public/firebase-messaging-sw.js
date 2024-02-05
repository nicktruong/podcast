/* eslint-disable no-undef */
// Scripts from firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

let firebaseConfig = null;

if (location.search) {
  const urlParams = new URLSearchParams(location.search);
  firebaseConfig = Object.fromEntries(urlParams);
}

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(firebaseConfig || defaultConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const { data } = payload;

  // Customize notification here
  const notificationTitle = `${data.creatorName} ${data.action} ${data.subject}`;
  const notificationOptions = {
    body: "GO Podcast now to listen",
    icon: data.creatorAvatar,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
