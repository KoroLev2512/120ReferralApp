import { useLocale } from "@/store/use-locale";
import { Button } from "./ui/button";
import { useUtils } from "@telegram-apps/sdk-react";
import { CHANNEL_LINK } from "@/lib/const";
import { useChannelJoinCompletionMutation } from "@/lib/queries";
import { useState } from "react";
import { useUnlock } from "@/providers/useUnlock";

export default function CommunityButton() {
  const { messages } = useLocale();
  const utils = useUtils();
  const channelJoin = useChannelJoinCompletionMutation();
  const [loading, setLoading] = useState<boolean>(false)
  const { enableReward } = useUnlock();

  const handleClick = async () => {
    setLoading(true);
    try {
        await channelJoin.mutateAsync();
    } catch (error) {
        console.error("Failed to do smth", error);
    } finally {
        setLoading(false);
        enableReward(true);
    }
    utils.openTelegramLink(CHANNEL_LINK);
  };

  return (
    <Button className="px-1" onClick={handleClick} disabled={loading}>
      {messages.nfts[0].button}
    </Button>
  );
}
