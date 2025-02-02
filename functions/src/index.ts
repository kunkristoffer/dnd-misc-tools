import { beforeUserCreated } from "firebase-functions/v2/identity";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { log } from "firebase-functions/logger";

const adminApp = initializeApp();
const adminDB = getFirestore(adminApp);

export const createUserProfile = beforeUserCreated(async (event) => {
  if (event.data) {
    const user = { uid: event.data.uid, displayName: event.data.displayName, photoURL: event.data.photoURL };
    await adminDB.collection("users").doc(user.uid).create(user);
    log(`Added ${user.displayName} to firestore collection users/${user.uid}`);
  }
});
