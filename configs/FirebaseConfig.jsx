// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'; // Correct import
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR-H-TiyleKnf6ZWUh8kFdPrxRmKrdZ3Q",
  authDomain: "businessapp-72970.firebaseapp.com",
  projectId: "businessapp-72970",
  storageBucket: "businessapp-72970.firebasestorage.app",
  messagingSenderId: "341839271304",
  appId: "1:341839271304:web:5dbb0c5ebfcbf9a1ef163d",
  measurementId: "G-04B6YNSRT9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app)
// const analytics = getAnalytics(app);