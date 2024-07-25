import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { LockKeyholeOpen } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import Video from "./ui/video";
import { useUnlockMutation } from "@/lib/queries";

type Props = {
  level: number;
  message?: string;
  button?: string;
};

export default function Unlock({ level, message, button }: Props) {
  const [locked, setLocked] = useState(true);
  const haptic = useHapticFeedback();
  const navigate = useNavigate();
  const { mutateAsync: fetchUnlock } = useUnlockMutation();

  const handleUnlockClick = () => {
    haptic.impactOccurred("heavy");
    fetchUnlock().then(() => {
      setLocked(false);
    });
  };

  const handleViewClick = () => {
    navigate("/gallery");
  };

  if (locked) {
    return (
      <div className="relative" onClick={handleUnlockClick}>
        <div className="absolute flex flex-col gap-4 items-center justify-center top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg">
          <LockKeyholeOpen className="size-10 text-hint" />
          <h1 className="title">{message}</h1>
        </div>
        <img className="w-full" src={`/nft-${level + 1}-pre.png`} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center">
      <Video className="w-full" src={`/nft-${level + 1}.mp4`} />
      <Button onClick={handleViewClick}>{button}</Button>
    </div>
  );
}
