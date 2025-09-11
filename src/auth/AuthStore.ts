import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export class AuthStore {
  verificationId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isComplete(): boolean {
    return this.verificationId !== null;
  }

  clearVerificationId = () => {
    this.verificationId = null;
  };

  setVerificationId = (verificationId: string) => {
    this.verificationId = verificationId;
  };
}

export const AuthStoreContext = createContext<AuthStore | null>(null);

export const useAuthStore = () => {
  const authStore = useContext(AuthStoreContext);

  if (authStore === null) throw new Error("PANIC!");

  return authStore;
};
