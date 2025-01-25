import { HeaderNavBar } from "../navigation/navBar";
import { UserMenuHeader } from "../navigation/userMenu";

export async function Header() {
  return (
    <header className="bg-foreground flex items-center justify-end h-10 gap-4 px-4">
      <span className="mr-auto">logo.png</span>
      <HeaderNavBar />
      <UserMenuHeader />
    </header>
  );
}
