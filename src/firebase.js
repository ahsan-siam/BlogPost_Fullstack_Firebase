import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: SECRET",
  authDomain: "SECRET.firebaseapp.com",
  databaseURL: "SECRET.firebaseio.com",
  projectId: "SECRET",
  storageBucket: "SECRET.firebasestorage.app",
  messagingSenderId: "359490847244",
  appId: "1:359490847244:web:4fff43c46b3ba81c0a6429",
  measurementId: "G-WYKZ4HSLSG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword };
