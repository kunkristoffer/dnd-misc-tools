"use client";

import { useAuthContext } from "@/providers/auth";
import { UserMenuLoginButton } from "../ui/buttons/login";
import { AvatarCircular } from "../ui/avatars/circle";
import { UserMenuLogoutButton } from "../ui/buttons/logout";

export function UserMenuHeader() {
  const { user } = useAuthContext();

  return (
    <div className="h-6 w-6">
      {user && user.photoURL && <AvatarCircular href={user.photoURL} size={24} />}
      {user && !user.photoURL && <UserMenuLogoutButton />}
      {!user && <UserMenuLoginButton />}
    </div>
  );
}
