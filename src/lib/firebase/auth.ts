import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as _signOut,
  onAuthStateChanged as _onAuthStateChanged,
  NextOrObserver,
  User,
} from "firebase/auth";
import { clientAuth } from "./app";

// Signs in user with a google provider window
export async function signInPopup() {
  try {
    await signInWithPopup(clientAuth, new GoogleAuthProvider());
  } catch (err) {
    console.log("Error loging in with popup", err);
  }
}

// Firebase auth observer, detects changes in auth status
export function onAuthStateChanged(cb: NextOrObserver<User | null>) {
  return _onAuthStateChanged(clientAuth, cb);
}

// Log user out from application
export async function signOut() {
  try {
    await _signOut(clientAuth);
  } catch (err) {
    console.log(err);
  }
}
