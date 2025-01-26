"use client";

import { ItemPreview } from "@/components/ui/cards/itemPreview";
import { formItemInit } from "@/data/dnd/form";
import { editItem, getItemById } from "@/lib/firebase/firestore/items";
import { DnDItem, DnDItemRarity, DnDItemTypes } from "@/types/dnd/items.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [item, setItem] = useState<DnDItem>(formItemInit);
  const uid = usePathname().split("/").pop();

  async function handleSave() {
    if (!uid || uid.length !== 20) return;
    const res = await editItem(item, uid);
    console.log(res);
  }

  useEffect(() => {
    async function update() {
      if (!uid || uid.length !== 20) return;
      const result = await getItemById(uid);
      if (result.data) setItem((prev) => ({ ...prev, ...result.data }));
    }
    update();
  }, [uid]);

  return (
    <main>
      <div className="flex justify-between gap-12">
        <div className="flex flex-col gap-2">
          <h1>create item</h1>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={item.name}
            onChange={(e) => setItem((prev) => ({ ...prev, name: e.target.value }))}
            className="bg-panel py-1 px-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="price"
            value={item.price === 0 ? "" : item.price}
            onChange={(e) => setItem((prev) => ({ ...prev, price: Number(e.target.value) }))}
            className="bg-panel py-1 px-2 rounded"
          />
          <input
            type="text"
            name="rarity"
            placeholder="rarity"
            value={item.rarity}
            onChange={(e) => setItem((prev) => ({ ...prev, rarity: e.target.value as DnDItemRarity }))}
            className="bg-panel py-1 px-2 rounded"
          />
          <input
            type="text"
            name="type"
            placeholder="type"
            value={item.type}
            onChange={(e) => setItem((prev) => ({ ...prev, type: e.target.value as DnDItemTypes }))}
            className="bg-panel py-1 px-2 rounded"
          />
          <input
            type="text"
            name="subType"
            placeholder="subType"
            value={item.subType}
            onChange={(e) => setItem((prev) => ({ ...prev, subType: [e.target.value] }))}
            className="bg-panel py-1 px-2 rounded"
          />
          <span className=" bg-panel py-1 px-2">
            <input
              type="checkbox"
              name="attuned"
              placeholder="attuned"
              value={item.attuned ? "on" : ""}
              onChange={(e) => setItem((prev) => ({ ...prev, attuned: (e.target as HTMLInputElement).checked }))}
              className="mr-2"
            />
            requires attunement
          </span>
          <span className=" bg-panel py-1 px-2">
            <input
              type="checkbox"
              name="homebrew"
              placeholder="homebrew"
              value={item.homebrew ? "on" : ""}
              onChange={(e) => setItem((prev) => ({ ...prev, homebrew: (e.target as HTMLInputElement).checked }))}
              className="mr-2"
            />
            homebrew item
          </span>
          <input
            type="text"
            name="description"
            placeholder="description"
            value={item.description}
            onChange={(e) => setItem((prev) => ({ ...prev, description: e.target.value }))}
            className="bg-panel py-1 px-2 rounded"
          />
          <input
            type="text"
            name="source"
            placeholder="source"
            value={item.source}
            onChange={(e) => setItem((prev) => ({ ...prev, source: e.target.value }))}
            className="bg-panel py-1 px-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="image (tmp disabled)"
            disabled
            value={item.image}
            onChange={(e) => setItem((prev) => ({ ...prev, image: e.target.value }))}
            className="bg-foreground py-1 px-2 rounded"
          />
          <span>
            <button type="button" onClick={() => setItem(formItemInit)} className="bg-red-500 p-2">
              save
            </button>
            <button type="button" onClick={handleSave} className="bg-green-500 p-2">
              save
            </button>
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h1>item preview</h1>
          <ItemPreview item={{ ...item }} />
        </div>
      </div>
    </main>
  );
}
