import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, setLogLevel, initializeFirestore, Firestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCSKBrcYaIh_SHBJNtP6xxwquqO17m6meQ",
    authDomain: "designncode-c3380.firebaseapp.com",
    projectId: "designncode-c3380",
    storageBucket: "designncode-c3380.firebasestorage.app",
    messagingSenderId: "212177461161",
    appId: "1:212177461161:web:6a6b676e0388197a1aeeb8",
    measurementId: "G-WKLGR8NSVM"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore
let db: Firestore;

if (typeof window === "undefined") {
    setLogLevel("silent");
    try {
        db = initializeFirestore(app, {
            experimentalForceLongPolling: true,
        });
    } catch (e) {
        db = getFirestore(app);
    }
} else {
    db = getFirestore(app);
}


const auth = getAuth(app);

export { app, db, auth };