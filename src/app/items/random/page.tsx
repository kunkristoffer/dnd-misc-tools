"use client";

import { LoadingTextSpinner } from "@/components/ui/loading/textSpinner";
import { randomItem } from "@/lib/firebase/firestore/items";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    async function getRandom() {
      const result = await randomItem();
      if (result.body?._id) {
        router.push("/items/id/" + result.body._id);
      }
    }
    getRandom();
  }, [router]);
  return (
    <main>
      <LoadingTextSpinner />
    </main>
  );
}
