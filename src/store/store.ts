import { create } from "zustand";

import type { Locale, User } from "@/types";
import { retrieveLocale } from "@/lib/utils";

type State = {
  locale: Locale;
  user: User | undefined;
};

type Actions = {
  setLocale: (locale: State["locale"]) => void;
  setUser: (user: User) => void;
};

export const useStore = create<State & Actions>((set) => ({
  locale: retrieveLocale(),
  user: undefined,
  wallet: undefined,
  setUser: (user: User) => set({ user }),
  setLocale: (locale: Locale) => set({ locale }),
}));
