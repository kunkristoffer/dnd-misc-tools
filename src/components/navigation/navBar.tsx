"use client";

import { useAuthContext } from "@/providers/auth";
import { NavBarLink } from "../ui/links/navBar";
import menuItem from "@/data/navigation/navBarLinks.json";

export function HeaderNavBar() {
  const { user } = useAuthContext();
  if (user)
    return (
      <nav className="flex items-center">
        {menuItem.map((item, index) => (
          <NavBarLink key={`${item.label}${index}`} {...item} />
        ))}
      </nav>
    );

  return null;
}
