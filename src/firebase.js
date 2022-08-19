// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACQweJlrjjgQOTEYMkhREOAuvgdArZycg",
  authDomain: "loging-nuvector.firebaseapp.com",
  projectId: "loging-nuvector",
  storageBucket: "loging-nuvector.appspot.com",
  messagingSenderId: "595049122711",
  appId: "1:595049122711:web:712a33571e4ceb02a312d2",
  measurementId: "G-E1NCHKRRK1",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
