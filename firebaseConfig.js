// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-q9yrZbjofUvUvaoiFsqCJ8ZhewcJ-Yk",
  authDomain: "abhi-musics.firebaseapp.com",
  databaseURL: "https://abhi-musics-default-rtdb.firebaseio.com",
  projectId: "abhi-musics",
  storageBucket: "abhi-musics.appspot.com",
  messagingSenderId: "555152095182",
  appId: "1:555152095182:web:9b0dcf8dcb8532bd721d9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();