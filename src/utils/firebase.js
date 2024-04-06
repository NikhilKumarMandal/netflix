// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pogotv-6357b.firebaseapp.com",
  projectId: "pogotv-6357b",
  storageBucket: "pogotv-6357b.appspot.com",
  messagingSenderId: "60312869688",
  appId: "1:60312869688:web:fa76d7d49170eaf3cd7fcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();