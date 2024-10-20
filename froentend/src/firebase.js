// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_il-wR98-JllCNmbLusN7xElxnqMnfpk",
  authDomain: "eventauthentication-da85a.firebaseapp.com",
  projectId: "eventauthentication-da85a",
  storageBucket: "eventauthentication-da85a.appspot.com",
  messagingSenderId: "540383849201",
  appId: "1:540383849201:web:d2beb84db541192cb81750"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth=getAuth(app)
 export {auth}