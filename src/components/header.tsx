import { useHapticFeedback, useUtils } from "@telegram-apps/sdk-react";
import TasksPopover from "./tasks-popover";
import { useNavigate } from "react-router-dom";
import { Book, CircleHelp } from "lucide-react";
import { CHANNEL_LINK, GITBOOK_LINK } from "@/lib/const";

const ChannelLink = () => {
  const utils = useUtils();
  const haptic = useHapticFeedback();

  const handleClick = () => {
    haptic.impactOccurred("soft");
    utils.openTelegramLink(CHANNEL_LINK);
  };

  return (
    <img
      className="h-8 w-8 overflow-hidden rounded-full cursor-pointer"
      src="/referal/task-logo.png"
      alt="Channel"
      onClick={handleClick}
    />
  );
};

const BookLink = () => {
  const utils = useUtils();
  const haptic = useHapticFeedback();

  const handleClick = () => {
    haptic.impactOccurred("soft");
    utils.openLink(GITBOOK_LINK);
  };

  return (
    <div
      className="rounded-full h-8 w-8 flex items-center justify-center border-2 cursor-pointer"
      onClick={handleClick}
    >
      <Book className="size-4" />
    </div>
  );
};

const OnboardingLink = () => {
  const navigate = useNavigate();
  const haptic = useHapticFeedback();

  const handleClick = () => {
    haptic.impactOccurred("soft");
    navigate("/onboarding");
  };

  return (
    <CircleHelp
      className="h-8 w-8 text-hint cursor-pointer"
      onClick={handleClick}
    />
  );
};

export default function Header() {
  return (
    <header className="w-full px-8 flex items-center justify-between">
      <div className="flex items-center gap-1">
        <ChannelLink />
        <BookLink />
        <OnboardingLink />
      </div>
      <TasksPopover />
    </header>
  );
}
