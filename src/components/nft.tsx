import { useLocale } from "@/store/use-locale";
import { LockKeyhole } from "lucide-react";
import Video from "./ui/video";
import { useState } from "react";
import { useHapticFeedback } from "@telegram-apps/sdk-react";

type Props = {
  level: number;
  userLevel: number;
};

const UnlockedNft = ({ level }: { level: number }) => {
  const { messages } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const haptic = useHapticFeedback();
  const m = messages.nfts[level];

  const handleClick = () => {
    haptic.impactOccurred("soft");
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleClick}>
      {isOpen && (
        <div className="absolute flex flex-col gap-4 items-center justify-center top-0 left-0 w-full h-full bg-black/70 backdrop-blur-lg">
          <div className="flex flex-col justify-center items-center">
            <h1 className="title text-white font-extrabold">{m.name}</h1>
            <p className="footnote text-hint">{m.alt}</p>
          </div>
          <h2 className="headline text-white text-center p-12">
            {m.description}
          </h2>
        </div>
      )}
      <Video className="w-full" src={`/nft-${level + 1}.mp4`} />
    </div>
  );
};

export default function NFT({ level, userLevel }: Props) {
  const { messages } = useLocale();

  const m = messages.nfts[level];

  if (userLevel < level) {
    return (
      <div className="relative">
        <div className="absolute flex flex-col gap-4 items-center justify-center top-0 left-0 w-full h-full bg-black/90 backdrop-blur-lg">
          <LockKeyhole className="size-10 text-hint" />
          <h1 className="title px-16 text-center">{m.locked}</h1>
        </div>
        <img
          className="w-full"
          src={`/nft-${level + 1}-pre.png`}
          alt={m.name}
        />
      </div>
    );
  }

  return <UnlockedNft level={level} />;
}
