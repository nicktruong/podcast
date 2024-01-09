// SDKs and firebase products reference: https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhA4zIgiWNUeXYS1OL0feX7X9QheApjKM",
  authDomain: "podcast-185c3.firebaseapp.com",
  projectId: "podcast-185c3",
  storageBucket: "podcast-185c3.appspot.com",
  messagingSenderId: "703910577931",
  appId: "1:703910577931:web:e077d8d8d465d2905d440e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase authentication
export const auth = getAuth(app);

// Initialize Firebase firestore
export const db = getFirestore(app);
