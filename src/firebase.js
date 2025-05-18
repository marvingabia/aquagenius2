// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLXjo1PJc23L0h6rTVrOw2YUu4C1AKM3g",
  authDomain: "aquagenius-monitor.firebaseapp.com",
  projectId: "aquagenius-monitor",
  storageBucket: "aquagenius-monitor.firebasestorage.app",
  messagingSenderId: "150300028420",
  appId: "1:150300028420:web:9707bda574717461ff8f51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };