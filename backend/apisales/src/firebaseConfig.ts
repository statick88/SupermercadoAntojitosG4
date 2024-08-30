// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVNQg4KRdo_Y55rFSl8avWkhMnKdf7B-w",
    authDomain: "supermercadoantojitos.firebaseapp.com",
    projectId: "supermercadoantojitos",
    storageBucket: "supermercadoantojitos.appspot.com",
    messagingSenderId: "161757551267",
    appId: "1:161757551267:web:1443be851db529ca613d16"
  };  

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebaseDataBase = getDatabase(app);