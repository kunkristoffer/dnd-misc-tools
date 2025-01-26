import { DnDItem } from "./items.types";

export type FormDnDItem = Omit<DnDItem, "price"> & {
  price: string | number;
};
