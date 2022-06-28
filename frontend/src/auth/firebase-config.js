// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2u1ZKTkuGxE44AkEisX4e_N3HWoPpkIE",
    authDomain: "isatwhere-197ba.firebaseapp.com",
    projectId: "isatwhere-197ba",
    storageBucket: "isatwhere-197ba.appspot.com",
    messagingSenderId: "608484957489",
    appId: "1:608484957489:web:3654055161d3522d97e410",
    measurementId: "G-GR3M6FBHV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const db = getFirestore(app)