import { DnDItem } from "./dnd/items.types";

export interface GetAllItems {
  order?: "name" | "type" | "rarity" | "subtype" | "price";
  dir?: "asc" | "desc";
  start?: number;
  end?: number;
}

export interface GetAllItemsReturn {
  page: number;
  available: number;
  data: DnDItem[];
}
