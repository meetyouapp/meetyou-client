import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDJkp0Gnhggu4YoX1Ks7zzNP_7mEVhaIdQ",
  authDomain: "dating-app-expo.firebaseapp.com",
  projectId: "dating-app-expo",
  storageBucket: "dating-app-expo.appspot.com",
  messagingSenderId: "564613317450",
  appId: "1:564613317450:web:c7ce1150878bf37eef77b3",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
