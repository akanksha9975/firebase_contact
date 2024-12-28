// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPvrfr7NTvjFvTt3QiMf-Qas6yOiJx8Lg",
  authDomain: "vite-project-7fd24.firebaseapp.com",
  projectId: "vite-project-7fd24",
  storageBucket: "vite-project-7fd24.firebasestorage.app",
  messagingSenderId: "56986484994",
  appId: "1:56986484994:web:7b518e5d0bc048fd90021b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);