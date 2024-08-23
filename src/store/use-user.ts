import { useStore } from "./store";
import { useGetUserQuery } from "@/lib/queries";

export const useUser = () => {
  const { data: user, isLoading, isError } = useGetUserQuery();
  const setUser = useStore((state) => state.setUser);

  return { user, setUser, isLoading, isError };
};
