import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import Video from "@/components/ui/video";
import { DONATE_NFT_URL } from "@/lib/const";
import { useMintNFTMutation } from "@/lib/queries";
import { useLocale } from "@/store/use-locale";
import { useUser } from "@/store/use-user";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { TonConnectButton } from "@tonconnect/ui-react";
import { toast } from "sonner";

export default function Donate() {
  const { messages } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const haptic = useHapticFeedback();

  const handleClick = () => {
    haptic.impactOccurred("soft");
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {isOpen && (
        <div className="absolute flex flex-col gap-4 items-center justify-center top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg">
          <div className="flex flex-col justify-center items-center">
            <h1 className={"title text-white"}>{messages.donate.name}</h1>
            <p className="footnote text-hint">{messages.donate.alt}</p>
          </div>
          <h2 className="headline text-white text-center p-12">
            {messages.donate.description}
          </h2>
        </div>
      )}
      <Video className="w-full" src={DONATE_NFT_URL} />
    </div>
  );
}

export const DonateContent: FC = () => {
  const { messages } = useLocale();
  const { user } = useUser();
  const { mutateAsync: mint } = useMintNFTMutation();
  const haptic = useHapticFeedback();

  if (!user) {
    return null;
  }

  const handleClick = () => {
    haptic.impactOccurred("light");

    mint().then(() =>
      toast.success("NFT minted!", {
        duration: 1000,
      })
    );
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <TonConnectButton style={{ width: "100%" }} />
      </div>
      <Button
        variant="outline"
        disabled={!user.wallet || user.donateMinted}
        onClick={handleClick}
      >
        {messages.misc.mint}
      </Button>
      <p className="footnote text-hint text-center w-full">~0.2 TON gas fee</p>
    </>
  );
};
