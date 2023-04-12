// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzzrFs-qplqw1bWqfQinbaUWTyhuEVf_4",
  authDomain: "twl-development.firebaseapp.com",
  projectId: "twl-development",
  storageBucket: "twl-development.appspot.com",
  messagingSenderId: "468660717528",
  appId: "1:468660717528:web:8c5c13ae95b78b74fb14ad",
  measurementId: "G-1XNDWRNDE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);