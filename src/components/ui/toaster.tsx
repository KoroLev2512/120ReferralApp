"use client";

import { useMiniApp } from "@telegram-apps/sdk-react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const miniApp = useMiniApp();

  return (
    <Sonner
      theme={miniApp.isDark ? "dark" : "light"}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-bg group-[.toaster]:text-white group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-hint",
          actionButton: "group-[.toast]:bg-ton-blue group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-hint",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
