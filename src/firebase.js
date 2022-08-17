import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const logInWithEmailAndPassword = async (
  email,
  password,
  onLoginSuccess
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    onLoginSuccess?.();
  } catch (err) {
    alert(err);
    console.error(err);
  }
};

export const registerWithEmailAndPassword = async (
  name,
  email,
  password,
  role = 'user',
  onRegisterSuccess
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
      role,
    });
    onRegisterSuccess?.();
  } catch (err) {
    alert(err);
    console.error(err);
  }
};

export const logout = () => {
  signOut(auth);
};
