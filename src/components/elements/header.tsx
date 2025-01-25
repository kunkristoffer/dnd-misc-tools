import { HeaderNavBar } from "../navigation/navBar";

export async function Header() {
  return (
    <header className="bg-foreground p-4 flex justify-between">
      <span>logo.png</span>
      <HeaderNavBar />
    </header>
  );
}
