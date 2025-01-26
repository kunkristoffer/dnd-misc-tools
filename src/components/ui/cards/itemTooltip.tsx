import { DnDItem } from "@/types/dnd/items.types";

export function ItemTooltip({}: DnDItem) {
  return (
    <div className="flex flex-col gap-2">
      <span>name</span>
    </div>
  );
}
