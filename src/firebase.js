import {getFirestore} from 'firebase/firestore'
import {initializeApp} from 'firebase/app'
const firebaseConfig = {
    apiKey: "AIzaSyDWNX2uEy_yszG2cmMKOnlHiYB6kCcu9yg",
    authDomain: "todo-cec8b.firebaseapp.com",
    projectId: "todo-cec8b",
    storageBucket: "todo-cec8b.appspot.com",
    messagingSenderId: "750571150818",
    appId: "1:750571150818:web:fa5ccc87b20d9be1532dbb",
    measurementId: "G-5X7BRSYLNT"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
