import { NavBarLink } from "../ui/links/navBar";
import menuItem from "@/data/navigation/navBarLinks.json";

export async function HeaderNavBar() {
  return (
    <nav className="flex items-center">
      {menuItem.map((item, index) => (
        <NavBarLink key={`${item.label}${index}`} {...item} />
      ))}
    </nav>
  );
}
