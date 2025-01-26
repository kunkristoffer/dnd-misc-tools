"use client";

import { ItemPreview } from "@/components/ui/cards/itemPreview";
import { InputCheckbox } from "@/components/ui/input/checkbox";
import { InputNumber } from "@/components/ui/input/number";
import { InputSelect } from "@/components/ui/input/select";
import { InputText } from "@/components/ui/input/text";
import { InputTextarea } from "@/components/ui/input/textarea";
import { formAvailableRarity, formAvailableTypes, formGetSubTypes, formItemInit } from "@/data/dnd/form";
import { deleteItem, editItem, getItemById } from "@/lib/firebase/firestore/items";
import { DnDItem, DnDItemRarity, DnDItemTypes } from "@/types/dnd/items.types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [item, setItem] = useState<DnDItem>(formItemInit);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const uid = usePathname().split("/").pop();
  const router = useRouter();

  async function handleDelete() {
    if (!uid || uid.length !== 20) return;

    if (!deleteConfirm) return setDeleteConfirm(true);

    if (deleteConfirm) {
      const res = await deleteItem(uid);
      if (res.code === 200) {
        setDeleteConfirm(false);
        setItem(formItemInit);
        router.push("/items/create");
      }
    }

    // redirect on success to create item?
  }

  async function handleSave() {
    if (!uid || uid.length !== 20) return;
    const res = await editItem(item, uid);
    console.log(res);
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
  return (
    <main>
      <div className="flex justify-between gap-12">
        <div className={`p-2 flex gap-2 rounded-md bg-foreground`}>
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
              onChange={(value) => setItem((prev) => ({ ...prev, type: value as DnDItemTypes, subType: [] }))}
            />
            {item.type && (
              <InputSelect
                name="subType"
                label="Item subtype"
                value={item.subType}
                options={formGetSubTypes(item.type)}
                multiple
                onChange={(value) => setItem((prev) => ({ ...prev, subType: value as string[] }))}
              />
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
              onChange={(e) => setItem((prev) => ({ ...prev, description: e.target.value }))}
            />
            <span>
              <button type="button" onClick={handleDelete} className="bg-red-500 p-2">
                delete
              </button>
              <button type="button" onClick={handleSave} className="bg-green-500 p-2">
                save
              </button>
            </span>
            <span>
              {deleteConfirm && (
                <div className="z-50 fixed inset-0 top-10 backdrop-blur-sm backdrop-brightness-50 flex justify-center items-center">
                  <div className="flex flex-col items-center p-10 gap-4 rounded-md bg-panel">
                    <h1>Youre about to delete this item, are you sure?</h1>
                    <h2>There is no going back 😵</h2>
                    <span className="flex justify-around w-full">
                      <button
                        type="button"
                        className="bg-blue-500 px-4 py-2 rounded-md hover:scale-105 duration-200"
                        onClick={() => setDeleteConfirm(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 px-4 py-2 rounded-md hover:scale-105 duration-200"
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              )}
            </span>
          </div>
          <div
            className={`relative w-32 rounded bg-input`}
          >
            <p className="absolute left-2 -top-2 text-xs text-secondary">Item bases</p>
            <p className="w-full px-2 text-pretty">Finn en måte å gjemme meg vekk på som kan animeres :)</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1>item preview</h1>
          <ItemPreview item={{ ...item }} />
        </div>
      </div>
    </main>
  );
}
