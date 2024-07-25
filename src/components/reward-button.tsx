import type { User } from "@/types";
import { Button } from "./ui/button";
import { useLocale } from "@/store/use-locale";
import { useUser } from "@/store/use-user";
import { REF_COUNT_BY_NFT_LEVEL } from "@/lib/const";

export default function RewardButton({
  invitations,
  current,
}: Pick<User, "invitations"> & { current: number }) {
  const { messages } = useLocale();
  const { user } = useUser();
  const amountNeeded = REF_COUNT_BY_NFT_LEVEL[current];

  const isDisabled =
    !user || user.level < current - 1 || invitations < amountNeeded;

  return (
    <Button variant="outline" disabled={isDisabled}>
      {messages.misc.getReward}
    </Button>
  );
}
