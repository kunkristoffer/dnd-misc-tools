"use client";

import Link from "next/link";
import { DnDItem } from "@/types/dnd/items.types";
import { AvatarCircular } from "../avatars/circle";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isUrl } from "@/utils/url";
import { urlExtractDomainName } from "@/utils/text";
// import { convertDateToAgo } from "@/utils/date";

interface ItemPreviewProps {
  item: DnDItem;
  editable?: boolean;
}

export function ItemPreview({ item, editable = false }: ItemPreviewProps) {
  const [base, setBase] = useState<string>("item");
  const uid = usePathname().split("/").pop();

  useEffect(() => {
    const test = setInterval(() => {
      if (item.bases.length > 0) {
        setBase(item.bases[Math.floor(Math.random() * item.bases.length)]);
      } else {
        setBase("item");
      }
    }, 2000);
    return () => {
      clearInterval(test);
    };
  }, [item.bases]);

  return (
    <div
      className={`group relative flex flex-col gap-2 p-2 min-w-64 min-h-64 lg:max-w-[40svw] w-screen rounded ${item.rarity} text-primary border bg-panel`}
    >
      <span className="flex">
        <span className="mr-auto text-secondary text-2xl">
          {item.type === "prefix" && (
            <h2>
              {" "}
              <span className={`${item.rarity}`}>{item.name}</span> &#91; {base} &#93;
            </h2>
          )}
          {item.type === "suffix" && (
            <h2>
              {" "}
              &#91; {base} &#93; <span className={`${item.rarity} font-bold`}>{item.name}</span>
            </h2>
          )}
          {!(item.type === "prefix" || item.type === "suffix") && (
            <h2>
              <span className={`${item.rarity} font-bold`}>{item.name}</span>
            </h2>
          )}
        </span>
        <h3 className={`hidden mr-auto font-bold text-xl capitalize ${item.rarity}`}>
          {item.name ? item.name : "item name"}
        </h3>
        <span className="flex gap-2">
          {item.attuned && <p title="requires attunement">⌛</p>}
          {item.homebrew && <p title="home brew">🏠</p>}
        </span>
      </span>
      <span className="flex gap-2">
        <p className={`${item.rarity}`}>{item.rarity}</p>

        {typeof item.subType === "string" ? (
          <p>{item.subType}</p>
        ) : item.subType.length > 1 ? (
          <p>&#91;{item.subType.join(", ")}&#93;</p>
        ) : (
          <p>{item.subType}</p>
        )}

        {!(item.type === "prefix" || item.type === "suffix") && item.bases.length === 1 ? (
          <p className={`${item.rarity}`}>{item.bases[0]}</p>
        ) : (
          <p className={`${item.rarity}`}>{item.type}</p>
        )}
      </span>
      {item.bases.length > 1 && <span className="text-secondary text-center text-sm">{item.bases.join(", ")}</span>}
      <span className="flex-1 text-gray-400 italic text-pretty max-h-96 overflow-scroll">{item.description}</span>
      <span className="flex justify-end">
        {item.source && (
          <span className="flex gap-2">
            <p>source:</p>
            {isUrl(item.source) ? (
              <p>
                <a href="/" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  {urlExtractDomainName(item.source)}
                </a>
              </p>
            ) : (
              <p>{item.source}</p>
            )}
          </span>
        )}
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
          <Link href={"/items/edit/" + (item.id ?? uid)}>Edit</Link>
        </span>
      )}
    </div>
  );
}
