import { formAvailableRarity, formAvailableTypes } from "@/data/dnd/form";
import { z } from "zod";

export const itemFormSchema = z
  .object({
    name: z.string({ required_error: "Item must have a name" }).min(3, { message: "Item name is too short" }).trim(),
    attuned: z.boolean(),
    homebrew: z.boolean(),
    rarity: z.enum(formAvailableRarity, { message: "Item rarity is required" }),
    type: z.enum(formAvailableTypes, { message: "Item type is required" }),
    subType: z.string().array(),
    bases: z.string().array(),
    description: z.string().trim().optional(),
    price: z
      .number({ invalid_type_error: "Item must be a whole number" })
      .nonnegative({ message: "Must be a positive number" })
      .int()
      .optional(),
    source: z.string().trim().optional(),
    image: z.union([z.string().url().nullish(), z.literal("")]),
  })
  .refine(
    (item) => {
      const required = ["armor", "weapon", "prefix", "suffix", "wearables", "companion"];
      if (required.includes(item.type)) {
        if (item.subType.length === 0 || item.subType[0] === "") {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    {
      message: "You must select a sub-type",
      path: ["subType"],
    }
  )
  .refine(
    (item) => {
      if (item.subType.length > 0 && item.subType[0] !== "") {
        if (item.type === "wearables" || item.type === "companion") {
          return true;
        } else {
          if (item.type === "armor" || item.type === "weapon") {
            if (item.bases.length === 1) {
              return true;
            } else {
              return false;
            }
          } else {
            if (item.bases.length > 0) {
              return true;
            } else {
              return false;
            }
          }
        }
      } else {
        return true;
      }
    },
    {
      message: "You must select a base",
      path: ["bases"],
    }
  );

export type ItemFormSchema = z.infer<typeof itemFormSchema>;
export type ItemFormSchemaErrors = z.inferFormattedError<typeof itemFormSchema>;
