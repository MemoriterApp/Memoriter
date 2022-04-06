// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBXsAk4E47Z9WyZ6__2WQNPnZi0aoWA4Q",
  authDomain: "memoriter-802b0.firebaseapp.com",
  projectId: "memoriter-802b0",
  storageBucket: "memoriter-802b0.appspot.com",
  messagingSenderId: "7107097450",
  appId: "1:7107097450:web:5352b9a5f9abf638e76b13",
  measurementId: "G-JES49GGH5N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default firebase;