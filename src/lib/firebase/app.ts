"use client";

import { initializeApp } from "firebase/app";
import { firebasePublicConfig } from "./config";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const clientApp = initializeApp(firebasePublicConfig);

// Export firestore, firedb and firebase auth
export const clientStore = getFirestore(clientApp);
export const clientDB = getDatabase(clientApp);
export const clientAuth = getAuth(clientApp);
