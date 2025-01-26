import { DnDItem } from "@/types/dnd/items.types";
import { AvatarCircular } from "../avatars/circle";
// import { convertDateToAgo } from "@/utils/date";

export function ItemPreview(item: DnDItem) {
  return (
    <div className={`flex flex-col gap-2  p-2 rounded ${item.rarity} text-primary border bg-panel`}>
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
      <span className="flex justify-between">
        <span className="flex">
          <span title={`Created ${item.createdAt?.toDate().toDateString()} by ${item.createdBy?.displayName}`}>
            <AvatarCircular href={item.createdBy?.photoURL} />
          </span>
          <span title={`Updated ${item.updatedAt?.toDate().toDateString()} by ${item.updatedBy?.displayName}`}>
            <AvatarCircular href={item.updatedBy?.photoURL} />
          </span>
        </span>
        <span>
          🪙
          {item.price.toLocaleString()}
        </span>
      </span>
    </div>
  );
}
