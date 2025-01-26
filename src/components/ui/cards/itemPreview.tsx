"use client";

import Link from "next/link";
import { DnDItem } from "@/types/dnd/items.types";
import { AvatarCircular } from "../avatars/circle";
import { usePathname } from "next/navigation";
// import { convertDateToAgo } from "@/utils/date";

export function ItemPreview(item: DnDItem) {
  const uid = usePathname().split("/").pop();
  return (
    <div className={`group relative flex flex-col gap-2 p-2 rounded ${item.rarity} text-primary border bg-panel`}>
      <span className="flex">
        <h3 className="mr-auto font-bold text-xl capitalize">{item.name}</h3>
        <span className="flex gap-2">
          {!item.attuned && <p title="requires attunement">⌛</p>}
          {!item.homebrew && <p title="home brew">🏠</p>}
        </span>
      </span>
      <span className="flex gap-2">
        <p className={`${item.rarity}`}>{item.rarity}</p>
        <p>
          {item.subType} {item.type}
        </p>
      </span>
      <span className="text-gray-400 italic">{item.description}</span>
      <span className="flex justify-end">
        <span className="flex mr-auto">
          {item.createdBy && (
            <span title={`Created ${item.createdAt?.toDate().toDateString()} by ${item.createdBy?.displayName}`}>
              <AvatarCircular href={item.createdBy?.photoURL} />
            </span>
          )}
          {item.updatedBy && (
            <span title={`Updated ${item.updatedAt?.toDate().toDateString()} by ${item.updatedBy?.displayName}`}>
              <AvatarCircular href={item.updatedBy?.photoURL} />
            </span>
          )}
        </span>
        <span>
          🪙
          {item.price.toLocaleString()}
        </span>
      </span>
      <span className={`opacity-0 group-hover:opacity-100 absolute px-2 rounded -bottom-3 left-1/2 -translate-x-1/2 border ${item.rarity} bg-panel hover:scale-110 duration-200`}>
        <Link href={"/items/edit/" + (item.id ?? uid)}>Edit</Link>
      </span>
    </div>
  );
}
