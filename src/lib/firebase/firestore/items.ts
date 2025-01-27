"use client";

import { DnDItem, DnDItemId } from "@/types/dnd/items.types";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  setDoc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { clientAuth, clientDB } from "../app";
import { userCollection } from "./users";
import { FirestoreUser } from "@/types/auth.types";
import { GetAllItems } from "@/types/firestore.types";

const itemCollection = collection(clientDB, "items");

export async function createItem(item: DnDItem) {
  try {
    // validate item
    const validated = true;
    if (!validated) return { code: 400, error: validated };

    // create doc ref
    const newDoc = doc(itemCollection);

    // add creator ref and timestamp as extra details
    if (!clientAuth.currentUser?.uid) return { code: 400, error: "Not authorized" };
    item.createdByRef = doc(userCollection, clientAuth.currentUser.uid);
    item.createdAt = Timestamp.fromDate(new Date());
    item.random = Math.floor(Math.random() * 100000000);
    item.id = newDoc.id;

    try {
      // post item, return generated id
      await setDoc(newDoc, item);
      return { code: 200, data: item };
    } catch (err) {
      return { code: 500, error: err };
    }
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
  item.updatedAt = Timestamp.fromDate(new Date());

  const result = await updateDoc(docRef, item);
  return { code: 200, data: result ?? item };
}

export async function getAllItems({ order = "name", start }: GetAllItems) {
  // Create query
  const q = query(itemCollection, orderBy(order), startAfter(start ?? 0), limit(50));

  // Get current set of documents
  const results = await getDocs(q);
  const data = results.docs.map((item) => {
    return { id: item.id, ...item.data() } as DnDItem;
  });

  // logic for pagination here :)

  // return object
  return {
    page: 1,
    available: 1,
    data,
  };
}

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
    return { code: 200, data: item, message: "Updated succesfully" };
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

export async function randomItem() {
  // Generate random number for splitting collection
  const seed = Math.floor(Math.random() * 100000000);

  // Split collection @ seed, get [0]
  const q = query(itemCollection, where("random", "<=", seed), orderBy("random"), limit(1));
  const res = await getDocs(q);

  // Return found, if none found, look in other direction
  if (res.size > 0) {
    console.log("first", res.docs[0].data())
    return { code: 200, body: res.docs[0].data() as DnDItem, message: "first" };
  } else {
    const qBackup = query(itemCollection, where("random", ">", seed), orderBy("random"), limit(1));
    const resBackup = await getDocs(qBackup);
    if (resBackup.size > 0) {
      console.log("second", res.docs[0].data())
      return { code: 200, body: resBackup.docs[0].data() as DnDItem, message: "backup" };
    } else {
      console.log("thrist")
      return { code: 400, error: "Something went wrong while querying firestore for a random item" };
    }
  }
}

export async function deleteItem(uid: DnDItemId) {
  // Obs! Deleting a document does not delete its subcollections!
  try {
    await deleteDoc(doc(itemCollection, uid));
    return { code: 200, message: "Successfully deleted item with id: " + uid };
  } catch (err) {
    return { code: 500, error: err };
  }
}
