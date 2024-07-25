import { useStore } from "./store";

export const useUser = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);

  return { user, setUser };
};
