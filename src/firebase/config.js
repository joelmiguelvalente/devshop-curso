// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
// eslint-disable-next-line no-undef
const app = initializeApp(__FIREBASE_CONFIG__);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);
