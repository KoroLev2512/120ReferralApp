import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type Props = {
  className?: string;
  variant?: "left" | "right";
} & PropsWithChildren;

const variants: Record<"left" | "right", string> = {
  left: "bg-ton-blue rounded-br-md",
  right: "bg-muted rounded-bl-md",
};

export default function MessageBubble({
  className,
  children,
  variant = "left",
}: Props) {
  return (
    <div
      className={cn(
        "py-4 px-6 rounded-3xl footnote text-left",
        variants[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
