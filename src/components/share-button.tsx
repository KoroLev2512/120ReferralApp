import { useLocale } from "@/store/use-locale";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { cn, createRefLink, getBottomPadding } from "@/lib/utils";
import { useUtils } from "@telegram-apps/sdk-react";
import CopyButton from "./copy-button";

export default function ShareButton() {
  const { messages } = useLocale();
  const utils = useUtils();
  const refLink = createRefLink();

  const handleShareClick = () => {
    utils.shareURL(refLink);
  };

  return (
    <Drawer fixed noBodyStyles disablePreventScroll>
      <DrawerTrigger asChild>
        <Button>{messages.misc.share}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{messages.inviteModal.title}</DrawerTitle>
          <DrawerDescription>
            {messages.inviteModal.description}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <div className={cn("w-full grid gap-4 px-12", getBottomPadding())}>
            <Button onClick={handleShareClick}>
              {messages.inviteModal.button}
            </Button>
            <CopyButton content={refLink} />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
