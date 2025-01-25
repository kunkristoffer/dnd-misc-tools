"use client";

import { DnDItem, DnDItemId } from "@/types/dnd/items.types";
import { addDoc, collection, doc, getDoc, getDocs, updateDoc, query } from "firebase/firestore";
import { clientAuth, clientDB } from "../app";
import { userCollection } from "./users";
import { FirestoreUser } from "@/types/auth.types";

const itemCollection = collection(clientDB, "items");

export async function createItem(item: DnDItem) {
  try {
    // validate item
    const validated = true;
    if (!validated) return { code: 400, error: validated };

    // add creator ref and timestamp as extra details
    if (!clientAuth.currentUser?.uid) return { code: 400, error: "Not authorized" };
    item.createdByRef = doc(userCollection, clientAuth.currentUser.uid);
    item.createdAt = new Date();

    // post item, return generated id
    const result = await addDoc(itemCollection, item);
    return { code: 200, data: result.id };
  } catch (err) {
    // catch and return server errors
    return { code: 500, error: err };
  }
}

export async function editItem(item: DnDItem, uid: string) {
  // Check if item exists in firestore
  const docRef = doc(clientDB, "items", uid);
  if (!docRef) return { code: 404, error: "Document not found in firestore" };

  // add updated by ref and timestamp as extra details
  if (!clientAuth.currentUser?.uid) return { code: 400, error: "Not authorized" };
  item.updatedByRef = doc(userCollection, clientAuth.currentUser.uid);
  item.updatedAt = new Date();

  const result = await updateDoc(docRef, item);
  return { code: 200, data: result ?? item };
}

/* export async function getAllItems() {
  // Todo: function to get all items from collection, paginated...
} */

export async function getItemById(uid: DnDItemId) {
  try {
    // validate uid
    const validated = !!uid;
    if (!validated) return { code: 404, error: "uid is not valid" };

    // fetch item from uid
    const result = await getDoc(doc(clientDB, "items", uid));

    // Return error if document doesn't exist
    if (!result.exists()) return { code: 400, error: "Document not found" };

    // Unpack result to access item fields
    const item = result.data() as DnDItem;

    // populate reference fields
    if (item?.createdByRef) {
      item.createdBy = (await getDoc(item.createdByRef)).data() as FirestoreUser;
      delete item.createdByRef;
    }
    if (item?.updatedByRef) {
      item.updatedBy = (await getDoc(item.updatedByRef)).data() as FirestoreUser;
      delete item.updatedByRef;
    }
    console.log(item);
    return { code: 200, data: item };
  } catch (err) {
    console.log(err);
    // catch and return server errors
    return { code: 500, error: err };
  }
}

/* export async function getItemQuantity() {
  // Todo:
} */

/* export async function getItemQuantityByRarity() {
  // Todo:
} */
