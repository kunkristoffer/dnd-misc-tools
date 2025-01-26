"use client";

import Link from "next/link";
import { getAllItems } from "@/lib/firebase/firestore/items";
import { DnDItem } from "@/types/dnd/items.types";
import { useEffect, useState } from "react";

export default function Page() {
  const [items, setItems] = useState<DnDItem[]>();
  useEffect(() => {
    async function update() {
      const data = await getAllItems({});
      setItems(data.data);
    }
    update();
  }, []);
  return (
    <main>
      <div className="flex flex-col gap-2">
        {items?.map((item) => (
          <span key={item.id} className="flex gap-2">
            <p>{item.name}</p>
            <Link href={`/items/id/${item.id}`} className="bg-secondary textp">
              open
            </Link>
            <Link href={`/items/edit/${item.id}`} className="bg-secondary textp">
              edit
            </Link>
          </span>
        ))}
      </div>
    </main>
  );
}
