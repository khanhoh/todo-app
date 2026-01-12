import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAP2CEm2HQPyUXX6FpFyTgjJThbOpZ_jvI",
  authDomain: "todoapp-d459f.firebaseapp.com",
  projectId: "todoapp-d459f",
  storageBucket: "todoapp-d459f.firebasestorage.app",
  messagingSenderId: "193140293220",
  appId: "1:193140293220:web:b294dbeb015cfc391b6971"
};

const app = initializeApp(firebaseConfig);
// Export the database instance to use in your sagas
export const db = getFirestore(app);