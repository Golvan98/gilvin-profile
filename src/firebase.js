// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyd-8KwzwmQXBYXK39TrTzPQ6xCx8QZ48",
  authDomain: "gilvin-profile.firebaseapp.com",
  projectId: "gilvin-profile",
  storageBucket: "gilvin-profile.firebasestorage.app",
  messagingSenderId: "292318089270",
  appId: "1:292318089270:web:eccaa306b417975c0c4897",
  measurementId: "G-E3E4GQ33R1"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firestore = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// You can also export analytics if you need it elsewhere
export { analytics , auth, provider};