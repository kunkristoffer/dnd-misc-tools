import { DnDItem } from "@/types/dnd/items.types";
import Link from "next/link";

interface ItemListProps {
  items: DnDItem[];
  page: number;
  available: number;
}

export function ItemList({ page, available, items }: ItemListProps) {
  // Todo: pagination
  // Todo: add sorting buttons
  // Todo: use search params https://nextjs.org/docs/app/api-reference/functions/use-search-params
  return (
    <div className="flex flex-col w-full p-2 rounded-md bg-foreground ">
      <table className="table-auto border-spacing-6 border-collapse ">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rarity</th>
            <th>Type</th>
            <th>Subtype</th>
            <th title="Homebrew item">🏠</th>
            <th title="Requires attunement">⌛</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className={`border rounded text-secondary border-background hover:bg-panel/50`}>
              <td className={`${item.rarity}`}>
                <Link href={"/items/id/" + item.id} className="pl-2 hover:underline">
                  {item.name}
                </Link>
              </td>
              <td className={`${item.rarity}`}>{item.rarity}</td>
              <td>{item.type}</td>
              <td>{item.subType}</td>
              <td>{item.homebrew && "🏠"}</td>
              <td>{item.attuned && "⌛"}</td>
              <td className="text-right pr-2">{item.price.toLocaleString()} 🪙</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-center gap-1 p-2">
        <button className="px-2 py-1 rounded bg-panel" disabled>
          prev
        </button>
        <button className="px-2 py-1 rounded underline bg-panel">1</button>
        <button className="px-2 py-1 rounded bg-panel">2</button>
        <button className="px-2 py-1 rounded bg-panel">3</button>
        <input type="text" name="inputPage" className="px-2 py-1 rounded w-12 bg-panel" placeholder="..." />
        <button className="px-2 py-1 rounded bg-panel">17</button>
        <button className="px-2 py-1 rounded bg-panel">next</button>
      </div>
    </div>
  );
}
