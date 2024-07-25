import { useAddUserWalletMutation, useLoginMutation } from "@/lib/queries";
import { retrieveLocale } from "@/lib/utils";
import { useLocale } from "@/store/use-locale";
import { useUser } from "@/store/use-user";
import { useTonAddress } from "@tonconnect/ui-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { setLocale } = useLocale();
  const { user, setUser } = useUser();
  const address = useTonAddress(true);
  const { mutateAsync: addWallet } = useAddUserWalletMutation();
  const { mutateAsync: login } = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setLocale(retrieveLocale());
  }, [setLocale]);

  useEffect(() => {
    console.log("Logging in...");
    login()
      .then((fetchedUser) => {
        // {message: "User added!"}
        console.log("Finished logging in, fetched user:", fetchedUser);
        if (fetchedUser) {
          setUser(fetchedUser);
          if (fetchedUser.level > 0) {
            console.log("User's level > 0, redirecting to gallery");
            navigate("/gallery");
          } else {
            navigate("/onboarding");
          }
        }
      })
      .finally(() => {
        console.log("Hiding loader");
        window.hideLoader();
      });
  }, [login, setUser, navigate]);

  useEffect(() => {
    if (address && user?.wallet !== address) {
      console.log("TONConnect address didn't mach user wallet, adding...");
      addWallet(address).then((u) => u && setUser(u));
    }
  }, [address, addWallet, setUser, user]);

  return null;
}
