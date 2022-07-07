// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDT7U5ngLbjqelNPwrXXvbrM2DgNc8-K7o",
  authDomain: "hospital-e4682.firebaseapp.com",
  projectId: "hospital-e4682",
  storageBucket: "hospital-e4682.appspot.com",
  messagingSenderId: "850029517424",
  appId: "1:850029517424:web:2ba1856283c6b100bc32b5",
  measurementId: "G-TYF9LC12E3"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };