"use client";

import { getItemById } from "@/lib/firebase/firestore/items";
import { DnDItem } from "@/types/dnd/items.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [item, setItem] = useState<DnDItem>();
  const uid = usePathname().split("/").pop();

  useEffect(() => {
    async function update() {
      if (!uid || uid.length !== 20) return;
      const result = await getItemById(uid);
      if (result.data) setItem(result.data);
    }
    update();
  }, [uid]);
  return (
    <main>
      <pre className="py-1 px-2 text-wrap">{JSON.stringify(item, null, 2)}</pre>
    </main>
  );
}
