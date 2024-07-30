import { retrieveLocale } from "@/lib/utils";
import type { Locale, User } from "@/types";
import { useStore as useZustand } from "zustand";
import { createStore } from "zustand/vanilla";

type State = {
  locale: Locale;
  user: User | undefined;
};

type Actions = {
  setLocale: (locale: State["locale"]) => void;
  setUser: (user: User) => void;
};

type Store = State & Actions;

const store = createStore<Store>((set) => ({
  locale: retrieveLocale(),
  user: undefined,
  wallet: undefined,
  setUser: (user: User) => set({ user }),
  setLocale: (locale: Locale) => set({ locale }),
}));

export function useStore(): Store;
export function useStore<T>(selector: (state: Store) => T): T;
export function useStore<T>(selector?: (state: Store) => T) {
  return useZustand(store, selector!);
}

export const getStore = () => store.getState();
