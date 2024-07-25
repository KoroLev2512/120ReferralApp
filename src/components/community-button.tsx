import { useLocale } from "@/store/use-locale";
import { Button } from "./ui/button";
import { useUtils } from "@telegram-apps/sdk-react";
import { CHANNEL_LINK } from "@/lib/const";

export default function CommunityButton() {
  const { messages } = useLocale();
  const utils = useUtils();

  const handleClick = () => {
    utils.openTelegramLink(CHANNEL_LINK);
  };

  return (
    <Button className="px-1" onClick={handleClick}>
      {messages.nfts[0].button}
    </Button>
  );
}
