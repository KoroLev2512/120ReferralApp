import type { User } from "@/types";
import { Button } from "./ui/button";
import { useLocale } from "@/store/use-locale";
import { useUser } from "@/store/use-user";
import { REF_COUNT_BY_NFT_LEVEL } from "@/lib/const";
import { useUnlockMutation } from "@/lib/queries";
import { useUnlock } from "@/providers/useUnlock";

export default function RewardButton({
    invitations,
    current,
  }: Pick<User, "invitations"> & { current: number }) {
    const { messages } = useLocale();
    const { user } = useUser();
    const amountNeeded = REF_COUNT_BY_NFT_LEVEL[current];
    const unlockLevel = useUnlockMutation();
    const { isRewardEnabled, enableReward } = useUnlock();

    const isDisabled =
      !user || user.level < current - 1 || invitations < amountNeeded || !user.unlockableLevel && user.level !== 0 || user.unlockableLevel == null || !isRewardEnabled;

    const handleUnlock = async () => {
      try {
        const result = await unlockLevel.mutateAsync();
        console.log('Unlock successful:', result);
        enableReward(false)
      } catch (error) {
        console.error('Unlock error:', error);
      }
    };

    return (
      <Button variant="outline" disabled={isDisabled} onClick={handleUnlock}>
        {messages.misc.getReward}
      </Button>
    );
  }
