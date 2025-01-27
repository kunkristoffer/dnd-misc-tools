"use client";

import { ItemPreview } from "@/components/ui/cards/itemPreview";
import { LoadingTextSpinner } from "@/components/ui/loading/textSpinner";
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
  return <main>{item ? <ItemPreview item={{ ...item }} editable /> : <LoadingTextSpinner />}</main>;
}
