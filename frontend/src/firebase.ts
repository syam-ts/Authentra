 
import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "authentra.firebaseapp.com",
  projectId: "authentra",
  storageBucket: "authentra.appspot.com",
  messagingSenderId: "844766357703",
  appId: "1:844766357703:web:83c06c1498ab5ef2b7f6e2"
};
 
export const app = initializeApp(firebaseConfig);