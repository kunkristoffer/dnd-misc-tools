"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "@/lib/firebase/auth";
import { AuthStore } from "@/types/auth.types";
import { useRouter } from "next/navigation";

// Init value for context
const AuthContext = createContext<AuthStore>({ user: null, signOut });

// auth context useHook
export function useAuthContext() {
  return useContext(AuthContext);
}

// Auth provider component wrapper
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthStore["user"]>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((res) => {
      if (!res?.displayName) {
        router.push("/");
      }
      setUser(res);
    });
    return () => unsubscribe();
  }, [router]);

  return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>;
}
