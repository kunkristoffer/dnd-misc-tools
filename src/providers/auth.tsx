"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "@/lib/firebase/auth";
import { AuthStore } from "@/types/auth.types";

// Init value for context
const AuthContext = createContext<AuthStore>({ user: null, signOut });

// auth context useHook
export function useAuthContext() {
  return useContext(AuthContext);
}

// Auth provider component wrapper
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthStore["user"]>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((res) => {
      setUser(res);
    });
    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, signOut }}>{children}</AuthContext.Provider>;
}
