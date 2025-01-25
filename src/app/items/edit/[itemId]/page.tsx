"use client";

import { formItemInit } from "@/data/dnd/form";
import { createItem, editItem, getItemById } from "@/lib/firebase/firestore/items";
import { DnDItem, DnDItemRarity, DnDItemTypes } from "@/types/dnd/items.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [item, setItem] = useState<DnDItem>(formItemInit);
  const uid = usePathname().split("/").pop();

  async function handleSave() {
    const res = await createItem(item);
    setItem((prev) => ({ ...prev, source: res.message as string }));
  }

  useEffect(() => {
    async function update() {
      if (!uid || uid.length !== 20) return;
      const result = await getItemById(uid);
      console.log(result);
    }
    update();
  }, [uid]);
  return (
    <main>
      <div className="flex gap-2 w-full">
        <div className="flex-1 flex flex-col items-end gap-1">
          <div className="flex flex-col gap-1 w-fit">
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
                onChange={(e) => setItem((prev) => ({ ...prev, attuned: !!e.target.value }))}
                className="mr-2"
              />
              requires attunement
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
              placeholder="image"
              value={item.source}
              onChange={(e) => setItem((prev) => ({ ...prev, source: e.target.value }))}
              className="bg-panel py-1 px-2 rounded"
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
        </div>

        <pre className="flex-1 py-1 px-2">{JSON.stringify(item, null, 2)}</pre>
      </div>
    </main>
  );
}
