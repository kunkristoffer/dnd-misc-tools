"use client";

import { DnDItem, DnDItemId } from "@/types/dnd/items.types";
import { addDoc, collection, doc } from "firebase/firestore";
import { clientAuth, clientDB } from "../app";

const itemCollection = collection(clientDB, "items");

export async function createItem(item: DnDItem) {
  try {
    // validate item
    const validated = true;
    if (!validated) return { code: 400, message: validated };

    // add details to item
    if (!clientAuth.currentUser?.uid) return { code: 400, message: "Not authorized" };
    const selfRef = doc(collection(clientDB, "users"), clientAuth.currentUser.uid);
    item.createdBy = selfRef;
    item.createdAt = item.createdAt = new Date();

    // post item, return generated id
    const result = await addDoc(itemCollection, item);
    return { code: 200, message: result.id };
  } catch (err) {
    // catch and return server errors
    return { code: 500, message: err };
  }
}

export async function editItem(item: DnDItem) {
  // Todo: edit item given an uid
}

export async function getAllItems() {
  // Todo: function to get all items from collection, paginated...
}

export async function getItemById(uid: DnDItemId) {
  console.log(uid);
}

export async function getItemQuantity() {
  // Todo:
}
export async function getItemQuantityByRarity() {
  // Todo:
}
