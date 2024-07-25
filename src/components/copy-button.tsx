import { useLocale } from "@/store/use-locale";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export default function CopyButton({ content }: { content: string }) {
  const haptic = useHapticFeedback();
  const { messages } = useLocale();

  const handleClick = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        haptic.notificationOccurred("success");
        toast.success(messages.clipboard.copied, {
          duration: 1000,
        });
      })
      .catch(() => {
        haptic.notificationOccurred("error");
        toast.error(messages.clipboard.failed, {
          duration: 1000,
        });
      });
  };

  return (
    <button
      className={
        "bg-black cursor-pointer text-hint font-semibold py-2 px-4 rounded flex items-center w-full overflow-hidden"
      }
      onClick={handleClick}
    >
      <span className="clip-text max-w-[calc(100%-20px)]">{content}</span>
      <Copy className="h-4 w-4 ml-1" />
    </button>
  );
}
