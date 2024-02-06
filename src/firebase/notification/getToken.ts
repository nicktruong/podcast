import { getToken, getMessaging } from "firebase/messaging";

import { app } from "../init";

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

export const getMessagingToken = () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  });
};
