"use client"

import { collection } from "firebase/firestore";
import { clientDB } from "../app";

export const userCollection = collection(clientDB, "users");