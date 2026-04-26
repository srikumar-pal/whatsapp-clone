import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDeBClg6IWy0PVrvpEz7L3jbJ5ISkQ-cVk",
  authDomain: "whatsapp-clone-dd69c.firebaseapp.com",
  projectId: "whatsapp-clone-dd69c",
  storageBucket: "whatsapp-clone-dd69c.firebasestorage.app",
  messagingSenderId: "387955347835",
  appId: "1:387955347835:web:a0ca9a25530203cf64adde",
  measurementId: "G-T5LQQKY1TJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;