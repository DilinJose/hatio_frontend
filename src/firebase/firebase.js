// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ3TP0cyDNfXryG-N78xovdd4pc_muGVM",
  authDomain: "todo-8c02d.firebaseapp.com",
  projectId: "todo-8c02d",
  storageBucket: "todo-8c02d.firebasestorage.app",
  messagingSenderId: "195916931162",
  appId: "1:195916931162:web:c199827f0c3a2c2cae7863"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
