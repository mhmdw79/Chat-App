import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
 
  apiKey: "AIzaSyB-7O5loVjD63aXwF1VOPwXWwGC1s6V8Yg",
  authDomain: "chat-test-9da64.firebaseapp.com",
  projectId: "chat-test-9da64",
  storageBucket: "chat-test-9da64.appspot.com",
  messagingSenderId: "274234629932",
  appId: "1:274234629932:web:3b9a8958b8aa9fcacb1689"

  }).auth();