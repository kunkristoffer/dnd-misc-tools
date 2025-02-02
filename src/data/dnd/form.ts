import { DnDItem, DnDItemTypes } from "@/types/dnd/items.types";
import { ammunition, armorHeavy, armorLight, armorMedium, shield, weaponMartialMelee, weaponMartialRanged, weaponSimpleMelee, weaponSimpleRanged, } from "./itemBases";

export const formAvailableRarity = [ "mundane", "common", "uncommon", "rare", "very-rare", "legendary", "artifact", ] as const;

export const formAvailableTypes = [ "weapon", "armor", "prefix", "suffix", "trinket", "wearables", "companion", ] as const;

export function formGetSubTypes(type: DnDItemTypes) {
  if (!type) return []
  switch (true) {
    case type.includes("fix"):
      return ["simple melee", "simple ranged", "martial melee", "martial ranged", "light", "medium", "heavy", "shield", "ammunition"];
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

export function formGetBases(subtypes: string[]) {
  const bases = [];

  if (subtypes.includes("simple melee")) bases.push({ label: "simple melee", value: weaponSimpleMelee });
  if (subtypes.includes("simple ranged")) bases.push({ label: "simple ranged", value: weaponSimpleRanged });
  if (subtypes.includes("martial melee")) bases.push({ label: "martial melee", value: weaponMartialMelee });
  if (subtypes.includes("martial ranged")) bases.push({ label: "martial ranged", value: weaponMartialRanged });
  if (subtypes.includes("light")) bases.push({ label: "light", value: armorLight });
  if (subtypes.includes("medium")) bases.push({ label: "medium", value: armorMedium });
  if (subtypes.includes("heavy")) bases.push({ label: "heavy", value: armorHeavy });
  if (subtypes.includes("shield")) bases.push({ label: "shield", value: shield });
  if (subtypes.includes("ammunition")) bases.push({ label: "ammunition", value: ammunition });

  return bases;
}

export const formItemInit: DnDItem = {
  name: "",
  rarity: "",
  type: "",
  subType: [],
  bases: [],
  attuned: false,
  homebrew: false,
  price: 0,
  source: "",
  image: "",
  description: "",
};
