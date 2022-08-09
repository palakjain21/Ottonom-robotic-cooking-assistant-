import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUGmX9q_C49r5wPa64IpMxlobVCxVSROk",
  authDomain: "robotic-cooking-assistant.firebaseapp.com",
  projectId: "robotic-cooking-assistant",
  storageBucket: "robotic-cooking-assistant.appspot.com",
  messagingSenderId: "239778887895",
  appId: "1:239778887895:web:9aca8bcdae2b2ac97d5892",
  measurementId: "G-M5Q84HPYKK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
console.log(db);
export { db };
