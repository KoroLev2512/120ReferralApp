import { Globe } from "lucide-react";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { useLocale } from "@/store/use-locale";

export default function ChangeLocale() {
  const { locale, setLocale } = useLocale();
  const haptic = useHapticFeedback();

  const handleClick = () => {
    setLocale(locale === "en" ? "ru" : "en");
    haptic.impactOccurred("soft");
  };

  return (
    <button
      className="p-4 rounded-[300px] px-[10px] py-[3px] flex items-center justify-center bg-muted gap-0.5"
      onClick={handleClick}
    >
      <Globe className="mr-1" />
      <span className="tg-title3 uppercase">{locale}</span>
    </button>
  );
}
