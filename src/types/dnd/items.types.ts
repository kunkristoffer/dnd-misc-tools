import { formAvailableRarity, formAvailableTypes } from "@/data/dnd/form";
import { DocumentReference, Timestamp } from "firebase/firestore";
import { FirestoreUser } from "../auth.types";

export type DnDItem = {
  id?: string;
  name: string;
  attuned: boolean;
  rarity: DnDItemRarity;
  type: DnDItemTypes;
  subType: string[];
  bases: string[];
  description: string;
  price: number;
  source?: string;
  image?: string;
  createdBy?: FirestoreUser;
  createdByRef?: DocumentReference;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  updatedBy?: FirestoreUser;
  updatedByRef?: DocumentReference;
  homebrew?: boolean;
};

export type DnDItemId = string;
export type DnDItemRarity = (typeof formAvailableRarity)[number] | "";
export type DnDItemTypes = (typeof formAvailableTypes)[number] | "";

// prettier-ignore
export type iDnDsubtypesValues = | "ammo" | "armor" | "heavy" | "light" | "martial melee" | "martial ranged" | "medium" | "shield" | "simple melee" | "simple ranged" | "weapon"| "";
