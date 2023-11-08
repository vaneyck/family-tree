// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import * as firebaseui from "firebaseui";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkLy68ZU_n5yUrx7GC0dxAr4Gc4Vra93o",
  authDomain: "family-tree-3772b.firebaseapp.com",
  databaseURL: "https://family-tree-3772b.firebaseio.com",
  projectId: "family-tree-3772b",
  storageBucket: "family-tree-3772b.appspot.com",
  messagingSenderId: "1002084678862",
  appId: "1:1002084678862:web:fea99fd8e068bb65aba49f",
  measurementId: "G-D1MQEK4M28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Setup local persistence
initializeFirestore(app, {});

// Initialize the firebaseui Widget using Firebase.
const auth = getAuth(app);
const ui = new firebaseui.auth.AuthUI(auth);

export const signInUi = ui;
export const firebaseAuth = auth;

const storage = getStorage(app);

export const firebaseStorage = storage;
