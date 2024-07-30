import CoinCounter from "@/components/coin-counter";
import CommunityButton from "@/components/community-button";
import Header from "@/components/header";
import NFT from "@/components/nft";
import RefCounter from "@/components/ref-counter";
import RewardButton from "@/components/reward-button";
import ShareButton from "@/components/share-button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import { REF_COUNT_BY_NFT_LEVEL } from "@/lib/const";
import { cn } from "@/lib/utils";
import { useLocale } from "@/store/use-locale";
import { useUser } from "@/store/use-user";
import {
  useBackButton,
  useMainButton,
  useMiniApp,
} from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Donate, { DonateContent } from "../components/donate";

export default function GalleryPage() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const { messages } = useLocale();
  const { user } = useUser();
  const [current, setCurrent] = useState(
    user && user.level > 0 ? user.level : 1
  );
  const miniApp = useMiniApp();
  const bb = useBackButton();
  const mb = useMainButton();

  useEffect(() => {
    mb.hide();
  }, [mb]);

  useEffect(() => {
    bb.hide();
  }, [bb]);

  useEffect(() => {
    miniApp.setHeaderColor("#000000");
    document.body.style.backgroundColor = "#000000";
  }, [miniApp]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
  }, [api]);

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div className="flex h-full flex-col justify-between">
        <Carousel
          className="w-full"
          opts={{
            startIndex: user.level > 0 ? user.level : 1,
          }}
          setApi={setApi}
        >
          <CarouselContent>
            <CarouselItem>
              <Donate />
            </CarouselItem>
            {Array.from({ length: 4 }).map((_, index) => (
              <CarouselItem key={index}>
                <NFT level={index} userLevel={user.level} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots current={current} total={5} />
        </Carousel>
        <section className={cn("w-full px-12 grid gap-2")}>
          {current === 0 && <DonateContent />}
          {current === 1 && (
            <>
              <div className="text-center w-full px-8">
                <h1 className="title text-center pb-1">
                  {messages.nfts[0].title}
                </h1>
                <p className="footnote text-hint text-center">
                  {messages.nfts[0].footnote}
                </p>
              </div>
              <CommunityButton />
              <RewardButton invitations={user.invitations} current={current} />
            </>
          )}
          {current > 1 && (
            <>
              <RefCounter
                invitations={user.invitations}
                total={REF_COUNT_BY_NFT_LEVEL[current]}
              />
              <CoinCounter balance={user.balance} />
              <ShareButton />
              <RewardButton invitations={user.invitations} current={current} />
            </>
          )}
        </section>
      </div>
    </>
  );
}
