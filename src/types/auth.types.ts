import { User } from "firebase/auth";

export type AuthStore = {
  user: User | null;
  signOut: () => void;
};

export type FirestoreUser = {
  displayName: string;
  photoURL: string;
};
