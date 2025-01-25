import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBq7osniG_fPICw-lv8t-J1eBc4lKvpD1k",
  authDomain: "expense-63774.firebaseapp.com",
  projectId: "expense-63774",
  storageBucket: "expense-63774.firebasestorage.app",
  messagingSenderId: "563861860210",
  appId: "1:563861860210:web:96ca72723ede5a8146b7eb",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);  // Firestore instance
