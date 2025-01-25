import { signInPopup } from "@/lib/firebase/auth";
import { LogOut } from "lucide-react";

export function UserMenuLogoutButton() {
  return (
    <button type="button" onClick={signInPopup} title="logout button">
      <LogOut />
    </button>
  );
}
