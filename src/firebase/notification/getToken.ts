import { getToken } from "firebase/messaging";

import { messaging } from "../init";

export const getMessagingToken = () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
  });
};
