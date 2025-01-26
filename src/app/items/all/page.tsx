"use client";

import { getAllItems } from "@/lib/firebase/firestore/items";
import { DnDItem } from "@/types/dnd/items.types";
import { useEffect, useState } from "react";
import { ItemList } from "@/components/ui/lists/itemList";

export default function Page() {
  const [items, setItems] = useState<DnDItem[]>([]);
  useEffect(() => {
    async function update() {
      const data = await getAllItems({});
      setItems(data.data);
    }
    update();
  }, []);
  return (
    <main className="gap-4">
      <h1 className="font-bold text-2xl">All available items</h1>
      <ItemList items={items} page={1} available={5} />
    </main>
  );
}
