import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCzXBhSmu6cDB-2_QossChU0f-KwP7jDmY",
    authDomain: "dejaview-35416.firebaseapp.com",
    projectId: "dejaview-35416",
    storageBucket: "dejaview-35416.firebasestorage.app",
    messagingSenderId: "569728621121",
    appId: "1:569728621121:web:113630a7ce04d7b81ec4c0"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


