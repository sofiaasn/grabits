// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjTM9EyHxyBNxovqnPkek6fL9--4UaMfE",
  authDomain: "grabits-94155.firebaseapp.com",
  projectId: "grabits-94155",
  storageBucket: "grabits-94155.appspot.com",
  messagingSenderId: "731539886867",
  appId: "1:731539886867:web:d9779cc6f95243ebe300e6",
  measurementId: "G-LBBE6XXDVY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const db = getFirestore(app);
