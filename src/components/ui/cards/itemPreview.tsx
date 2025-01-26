"use client";

import Link from "next/link";
import { DnDItem } from "@/types/dnd/items.types";
import { AvatarCircular } from "../avatars/circle";
import { usePathname } from "next/navigation";
// import { convertDateToAgo } from "@/utils/date";

interface ItemPreviewProps {
  item: DnDItem;
  editable?: boolean;
}

export function ItemPreview({ item, editable = false }: ItemPreviewProps) {
  const uid = usePathname().split("/").pop();
  return (
    <div
      className={`group relative flex flex-col gap-2 p-2 min-w-64 min-h-64 rounded ${item.rarity} text-primary border bg-panel`}
    >
      <span className="flex">
        <h3 className={`mr-auto font-bold text-xl capitalize ${item.rarity}`}>{item.name ? item.name : "item name"}</h3>
        <span className="flex gap-2">
          {item.attuned && <p title="requires attunement">⌛</p>}
          {item.homebrew && <p title="home brew">🏠</p>}
        </span>
      </span>
      <span className="flex gap-2">
        <p className={`${item.rarity}`}>{item.rarity}</p>
        <p>
          {item.subType} {item.type}
        </p>
      </span>
      <span className="flex-1 text-gray-400 italic">{item.description}</span>
      <span className="flex justify-end">
        <span>
          source:{" "}
          <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-500">
            link
          </a>
        </span>
        <span className="flex mx-auto">
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
      {editable && (
        <span
          className={`opacity-0 group-hover:opacity-100 absolute px-2 rounded -bottom-4 left-1/2 -translate-x-1/2 border ${item.rarity} bg-panel hover:scale-110 duration-200`}
        >
          <Link href={"/items/edit/" + (item._id ?? uid)}>Edit</Link>
        </span>
      )}
    </div>
  );
}
