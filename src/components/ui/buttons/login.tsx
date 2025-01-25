import { signInPopup } from "@/lib/firebase/auth";
import { LogIn } from "lucide-react";

export function UserMenuLoginButton() {
  return (
    <button type="button" onClick={signInPopup} title="login button">
      <LogIn />
    </button>
  );
}

