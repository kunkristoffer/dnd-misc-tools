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
      return ["simple melee", "simple ranged", "martial melee", "martial ranged", "light", "medium", "heavy", "shield", "ammo"];
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

  if (subtypes.includes("simple melee"))
    bases.push({
      label: "simple melee",
      value: [
        "club",
        "dagger",
        "greatclub",
        "handaxe",
        "javelin",
        "light hammer",
        "mace",
        "quarterstaff",
        "sickle",
        "spear",
      ],
    });

  if (subtypes.includes("simple ranged"))
    bases.push({ label: "simple ranged", value: ["boomerang", "light crossbow", "dart", "shortbow", "sling"] });

  if (subtypes.includes("martial melee"))
    bases.push({
      label: "martial melee",
      value: [
        "battleaxe",
        "flail",
        "glaive",
        "greataxe",
        "greatsword",
        "halberd",
        "lance",
        "longsword",
        "maul",
        "morningstar",
        "pike",
        "rapier",
        "scimitar",
        "shortsword",
        "trident",
        "war",
        "warhammer",
        "whip",
      ],
    });

  if (subtypes.includes("martial ranged"))
    bases.push({ label: "martial ranged", value: ["blowgun", "heavy crossbow", "hand crossbow", "longbow", "net"] });

  if (subtypes.includes("light")) bases.push({ label: "light", value: ["padded", "leather", "studded leather"] });

  if (subtypes.includes("medium"))
    bases.push({ label: "medium", value: ["hide", "chain shirt", "scale mail", "breastplate", "half plate"] });

  if (subtypes.includes("heavy")) bases.push({ label: "heavy", value: ["ring mail", "chain mail", "splint", "plate"] });

  if (subtypes.includes("shield")) bases.push({ label: "shield", value: ["shield"] });

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

// Why doesnt this function work with a switch statement?
/* export function formGetBases2(subtypes: string[]) {
  const bases = [];

  switch (true) {
    case subtypes.includes("simple melee"):
      bases.push({
        label: "simple melee",
        value: [
          "club",
          "dagger",
          "greatclub",
          "handaxe",
          "javelin",
          "light hammer",
          "mace",
          "quarterstaff",
          "sickle",
          "spear",
        ],
      });
    case subtypes.includes("simple ranged"):
      bases.push({ label: "simple ranged", value: ["boomerang", "light crossbow", "dart", "shortbow", "sling"] });
    case subtypes.includes("martial melee"):
      bases.push({
        label: "martial melee",
        value: [
          "battleaxe",
          "flail",
          "glaive",
          "greataxe",
          "greatsword",
          "halberd",
          "lance",
          "longsword",
          "maul",
          "morningstar",
          "pike",
          "rapier",
          "scimitar",
          "shortsword",
          "trident",
          "war",
          "warhammer",
          "whip",
        ],
      });
    case subtypes.includes("martial ranged"):
      bases.push({ label: "martial ranged", value: ["blowgun", "heavy crossbow", "hand crossbow", "longbow", "net"] });
    case subtypes.includes("light"):
      bases.push({ label: "light", value: ["padded", "leather", "studded leather"] });
    case subtypes.includes("medium"):
      bases.push({ label: "medium", value: ["hide", "chain shirt", "scale mail", "breastplate", "half plate"] });
    case subtypes.includes("heavy"):
      bases.push({ label: "heavy", value: ["ring mail", "chain mail", "splint", "plate"] });
    case subtypes.includes("shield"):
      bases.push({ label: "shield", value: ["shield"] });
  }

  return bases;
} */
