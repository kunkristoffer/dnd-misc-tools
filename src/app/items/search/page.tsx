"use client";

export default function Page() {
  return (
    <main>
      <h1>Searchable fields?</h1>
      <p>name: contains()</p>
      <p>rarity: is, greater, less</p>
      <p>price: is, greater, less</p>
      <p>type: is</p>
      <p>source: contains?</p>
      <p>subtype: is</p>
      <p>bases: includes()</p>
      <p>homebrew: boolean</p>
      <p>attuned: boolean</p>
      <p>created: before, at, after</p>
      <p>updated: before, at, after</p>
      <p>createdby: is</p>
      <p>updatedby: includes | is</p>
    </main>
  );
}


