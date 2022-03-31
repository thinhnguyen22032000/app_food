// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getFirestore } from 'firebase/firestore';

import firebase from '@react-native-firebase/app'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZgZNnWKBatt1J6sVyzbrWGKyLihFHe2k",
  authDomain: "quanlybanhang-34c55.firebaseapp.com",
  databaseURL: "https://quanlybanhang-34c55-default-rtdb.firebaseio.com",
  projectId: "quanlybanhang-34c55",
  storageBucket: "quanlybanhang-34c55.appspot.com",
  messagingSenderId: "950153550731",
  appId: "1:950153550731:web:9bd1db1444ed66f7cf6d8e",
  measurementId: "G-EG4SXPKW41"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)


// export {db}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}


export {firebase, firestore, storage, auth}
