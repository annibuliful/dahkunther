import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDphp80ZrvV_Jlm0Pruh5qiX8rQk7q84y0",
  authDomain: "dahlung.firebaseapp.com",
  projectId: "dahlung",
  storageBucket: "dahlung.appspot.com",
  messagingSenderId: "561312094764",
  appId: "1:561312094764:web:1c3da50a2bce562e170f89",
  measurementId: "G-11HHD8MTES",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default firebase;
