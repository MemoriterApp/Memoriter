// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = getAuth(app);
// const analytics = getAnalytics(app);

async function getNotes(database = db) {
  const notesCollection = collection(database, 'notes');
  const allNotes = await getDocs(notesCollection);
  const notesList = allNotes.docs.map(doc => doc.data());
  return notesList;
}

/*async function getFolder(database = db) {
  const FolderCollection = collection(database, 'folders');
  const allFolders = await getDocs(FolderCollection);
  const folderList = allFolders.docs.map(doc => doc.data());
  return folderList;
}*/
export const firebase = {
  app,
  // auth,
  // analytics,
  db,
  getNotes,
 // getFolder
};