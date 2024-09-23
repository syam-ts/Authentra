// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authentra.firebaseapp.com",
  projectId: "authentra",
  storageBucket: "authentra.appspot.com",
  messagingSenderId: "844766357703",
  appId: "1:844766357703:web:83c06c1498ab5ef2b7f6e2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);