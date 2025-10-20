import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class AuthStore {
  verificationId: string | null = null;
  isNew: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isComplete(): boolean {
    return this.verificationId !== null;
  }

  clearJoinStep = () => {
    this.verificationId = null;
  };

  setJoinStep = (verificationId: string, isNew: boolean) => {
    this.verificationId = verificationId;
    this.isNew = isNew;
  };
}

export const AuthStoreContext = createContext<AuthStore | null>(null);

export const useAuthStore = () => {
  const authStore = useContext(AuthStoreContext);

  if (authStore === null) throw new Error("PANIC!");

  return authStore;
};
