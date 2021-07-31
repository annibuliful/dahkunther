import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { DbCollection } from "../constants";
import { firebaseConfig } from "../config";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore;
export const storage = firebase.storage;

// firestore collections
export const firestorePersonCollection = firestore().collection(
  DbCollection.PERSON
);
export const firestoreBlameColletion = firestore().collection(
  DbCollection.BLAME_COMMENT
);

export default firebase;
