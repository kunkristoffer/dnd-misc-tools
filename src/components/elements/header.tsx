import { HeaderNavBar } from "../navigation/navBar";

export async function Header() {
  return (
    <header className="bg-foreground flex items-center justify-end px-4">
      <span className="mr-auto">logo.png</span>
      <HeaderNavBar />
      <span>user</span>
    </header>
  );
}
