// src/firebase/config.js
import { getAnalytics }  from 'firebase/analytics';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey:             import.meta.env.VITE_FIREBASE_API_KEY,
    appId:              import.meta.env.VITE_FIREBASE_APP_ID,
    authDomain:         import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    measurementId:      import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    messagingSenderId:  import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    projectId:          import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket:      import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
};

const app               = initializeApp(firebaseConfig);
export const auth       = getAuth(app);
export const db         = initializeFirestore(app, {
    // Soluciona los cortes/timeouts (ERR_TIMED_OUT) en móviles
    experimentalAutoDetectLongPolling: true,
    // Caché local, se define con funciones nativas (así evitas el error de cacheSizeBytes)
    localCache: persistentLocalCache({
        tabManager: persistentMultipleTabManager()
    })
});
export const analytics  = (typeof window !== 'undefined') ? getAnalytics(app) : null;