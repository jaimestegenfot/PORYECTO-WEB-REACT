// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz8TVpWNs03hgZRg34TrhXLpersccnSJk",
  authDomain: "clothes-8cf27.firebaseapp.com",
  databaseURL: "https://clothes-8cf27-default-rtdb.firebaseio.com",
  projectId: "clothes-8cf27",
  storageBucket: "clothes-8cf27.firebasestorage.app",
  messagingSenderId: "156018603789",
  appId: "1:156018603789:web:870325bee2bce38a2ce244"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;