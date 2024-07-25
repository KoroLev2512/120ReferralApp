import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "bg-ton-blue hover:bg-ton-blue-hover text-white font-semibold py-2 px-4 rounded transition-colors",
          variant === "outline" && "border-2 border-white",
          disabled && "bg-disabled text-bg hover:bg-disabled border-disabled",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
