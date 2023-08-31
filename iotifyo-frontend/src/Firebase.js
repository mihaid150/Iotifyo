import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7GCD0NsYojeYoBHmwzn0wefUm1JBI3nY",
  authDomain: "firm-lacing-396108.firebaseapp.com",
  projectId: "firm-lacing-396108",
  storageBucket: "firm-lacing-396108.appspot.com",
  messagingSenderId: "876504159479",
  appId: "1:876504159479:web:c5293614fb0d94a2feaff2",
  measurementId: "G-H5SY7YQR6D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);