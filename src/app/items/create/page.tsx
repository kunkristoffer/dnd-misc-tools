"use client";

import { ItemPreview } from "@/components/ui/cards/itemPreview";
import { InputCheckbox } from "@/components/ui/input/checkbox";
import { InputNumber } from "@/components/ui/input/number";
import { InputSelect } from "@/components/ui/input/select";
import { InputText } from "@/components/ui/input/text";
import { InputTextarea } from "@/components/ui/input/textarea";
import { formAvailableRarity, formAvailableTypes, formGetBases, formGetSubTypes, formItemInit } from "@/data/dnd/form";
import { createItem, getItemById } from "@/lib/firebase/firestore/items";
import { DnDItem, DnDItemRarity, DnDItemTypes } from "@/types/dnd/items.types";
import { stringArrayAddOrRemove } from "@/utils/array";
import { ArrowLeftToLine, ArrowRightFromLine } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [item, setItem] = useState<DnDItem>(formItemInit);
  const [showBases, setShowBases] = useState(true);
  const [availableBases, setAvailableBases] = useState<{ label: string; value: string[] }[]>([]);
  const uid = usePathname().split("/").pop();
  const router = useRouter();

  // Ugly hack for multi toggle, some voodo shit going on here :/
  function handleToggleBases(subType: string) {
    // prepare string[] lookup, create shallow copy of existing bases for mutation
    const baseObj = formGetBases([subType]);
    const bases = baseObj[0].value;
    const existing = [...item.bases];

    // Iterate over strings from args, add or remove from existing as needed
    for (const base of bases) {
      if (item.bases.includes(base)) {
        existing.splice(existing.indexOf(base));
      } else {
        existing.push(base);
      }
    }

    // Update item with mutated bases array
    setItem((prev) => ({ ...prev, bases: existing }));
  }

  async function handleSave() {
    // Todo: add toast for item saved feedbac
    const res = await createItem(item);
    if (res.code === 200) {
      setItem(formItemInit);
      router.push("/items/edit/" + res.data?._id);
    }
  }

  // Update form input if item exists
  useEffect(() => {
    async function update() {
      if (!uid || uid.length !== 20) return;
      const result = await getItemById(uid);
      if (result.data) setItem((prev) => ({ ...prev, ...result.data }));
      // todo redirect if item not found, means url is misspelled
    }
    update();
  }, [uid]);

  useEffect(() => {
    if (item.subType) {
      setAvailableBases(formGetBases(item.subType));
    }
  }, [item.subType]);

  useEffect(() => {
    if (availableBases.length === 0) {
      setShowBases(false);
    } else {
      setShowBases(true);
    }
  }, [availableBases]);
  return (
    <main>
      <div className="flex justify-between gap-12">
        <div className="p-2 flex gap-2 rounded-md bg-foreground">
          <div className="flex flex-col gap-2 w-48">
            <InputText
              name="name"
              label="Item name"
              value={item.name}
              onChange={(e) => setItem((prev) => ({ ...prev, name: e.target.value }))}
            />
            <InputSelect
              name="rarity"
              label="Item rarity"
              value={item.rarity}
              options={formAvailableRarity}
              onChange={(value) => setItem((prev) => ({ ...prev, rarity: value as DnDItemRarity }))}
            />
            <InputSelect
              name="type"
              label="Item type"
              value={item.type}
              options={formAvailableTypes}
              onChange={(value) =>
                setItem((prev) => ({ ...prev, type: value as DnDItemTypes, subType: [], bases: [] }))
              }
            />
            {item.type && (
              <InputSelect
                name="subType"
                label="Item subtype"
                value={item.subType}
                options={formGetSubTypes(item.type)}
                multiple={item.type.includes("fix")}
                onChange={(value) => setItem((prev) => ({ ...prev, subType: value as string[], bases: [] }))}
              />
            )}
            {item.subType && (
              <span className="flex gap-2">
                <InputText
                  name="bases"
                  label="Item bases"
                  value={item.bases.join(", ")}
                  onChange={(e) => setItem((prev) => ({ ...prev, bases: e.target.value.split(", ") }))}
                />
                <button
                  type="button"
                  className="py-1 px-4 rounded text-secondary bg-input hover:bg-input-hover hover:text-primary duration-200"
                  onClick={() => setShowBases(!showBases)}
                >
                  {showBases ? <ArrowLeftToLine /> : <ArrowRightFromLine />}
                </button>
              </span>
            )}
            <span className="flex gap-2 w-full">
              <InputCheckbox
                name="attuned"
                label="⌛"
                title="Item requires attunement"
                checked={item.attuned}
                onChange={(e) => setItem((prev) => ({ ...prev, attuned: (e.target as HTMLInputElement).checked }))}
              />
              <InputCheckbox
                name="homebrew"
                label="🏠"
                title="Item is a homebrew"
                checked={item.homebrew}
                onChange={(e) => setItem((prev) => ({ ...prev, homebrew: (e.target as HTMLInputElement).checked }))}
              />
            </span>
            <InputNumber
              name="name"
              label="Item price"
              value={item.price}
              onChange={(e) => setItem((prev) => ({ ...prev, price: Number(e.target.value) }))}
            />
            <InputText
              name="source"
              label="Item source"
              value={item.source ?? ""}
              onChange={(e) => setItem((prev) => ({ ...prev, source: e.target.value }))}
            />
            <InputText
              name="image"
              label="Item image"
              disabled
              value={item.image ?? ""}
              onChange={(e) => setItem((prev) => ({ ...prev, image: e.target.value }))}
            />
            <InputTextarea
              name="description"
              label="Item description"
              value={item.description ?? ""}
              className="flex-1"
              onChange={(e) => setItem((prev) => ({ ...prev, description: e.target.value }))}
            />
            <span className="flex text-sm">
              <button
                type="button"
                onClick={() => setItem(formItemInit)}
                className="flex-1 px-2 py-1 rounded-l bg-red-600 hover:bg-red-500"
              >
                delete
              </button>
              <button type="button" disabled className="flex-1 px-2 py-1 bg-blue-600 hover:bg-blue-500">
                generate
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 px-2 py-1 rounded-r bg-green-600 hover:bg-green-500"
              >
                update
              </button>
            </span>
          </div>
          {showBases && (
            <div className="relative w-32 rounded bg-input">
              <p className="absolute left-2 -top-2 text-xs text-secondary">Item bases</p>
              <div className="absolute inset-0 px-2 py-2 flex flex-col gap-3 overflow-y-auto ">
                {availableBases.map((category) => (
                  <span key={category.label} className="flex flex-col gap-1 text-xs">
                    <p
                      className="group text-center border-b p-1 hover:bg-input-hover hover:text-orange-500 cursor-pointer select-none"
                      onClick={() => handleToggleBases(category.label)}
                    >
                      {category.label}
                    </p>
                    {category.value.map((base) => (
                      <label
                        key={base}
                        className="flex gap-1 text-secondary hover:bg-input-hover hover:text-primary has-[:checked]:text-blue-400"
                      >
                        <input
                          type="checkbox"
                          checked={item.bases.includes(base)}
                          onChange={() =>
                            setItem((prev) => ({ ...prev, bases: stringArrayAddOrRemove(prev.bases, base) }))
                          }
                        />
                        <p className="flex-1">{base}</p>
                      </label>
                    ))}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <ItemPreview item={{ ...item }} />
        </div>
      </div>
    </main>
  );
}
