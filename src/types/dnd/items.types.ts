import { formAvailableRarity, formAvailableTypes } from "@/data/dnd/form";
import { DocumentReference } from "firebase/firestore";

export type DnDItem = {
  name: string;
  attuned: boolean;
  rarity: DnDItemRarity;
  type: DnDItemTypes;
  subType: string[];
  bases: string[];
  description: string;
  price: number;
  source: string;
  image: string;
  createdBy?: DocumentReference;
  createdAt?: Date;
  updatedAt?: Date;
  updatedBy?: string[];
  homebrew?: boolean;
};

export type DnDItemId = string;
export type DnDItemRarity = (typeof formAvailableRarity)[number] | "";
export type DnDItemTypes = (typeof formAvailableTypes)[number] | "";

// prettier-ignore
export type iDnDsubtypesValues = | "ammo" | "armor" | "heavy" | "light" | "martial melee" | "martial ranged" | "medium" | "shield" | "simple melee" | "simple ranged" | "weapon"| "";
