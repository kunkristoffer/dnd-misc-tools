import { DnDItem, DnDItemTypes } from "@/types/dnd/items.types";

// prettier-ignore
export const formAvailableRarity = [ "mundane", "common", "uncommon", "rare", "very-rare", "legendary", "artifact", ] as const;

// prettier-ignore
export const formAvailableTypes = [ "weapon", "armor", "ammo", "prefix", "suffix", "trinket", "wearables", "companion", ] as const;

// prettier-ignore
export function formGetSubTypes(type: DnDItemTypes) {
  if (!type) return []
  switch (true) {
    case type.includes("fix"):
      return ["weapon", "armor", "ammo"];
    case type === "armor":
      return ["light", "medium", "heavy", "shield"];
    case type === "weapon":
      return ["simple melee", "simple ranged", "martial melee", "martial ranged"];
    case type === "wearables":
      return [ "armband", "belt", "boots", "cloak", "earring", "facegear", "gloves", "headgear", "necklace", "pauldron", "ring", "tattoo", ];
    case type === "companion":
      return ["humanoid", "dragonborn", "robotic"];
    default:
      return [];
  }
}

/* export function formGetBases(subtypes: iDnDsubtypesValues[]) {
  // todo subtypes
} */

export const formItemInit: DnDItem = {
  name: "",
  rarity: "",
  type: "",
  price: 0,
  source: "",
  subType: [],
  attuned: false,
  bases: [],
  image: "",
  description: "",
};
