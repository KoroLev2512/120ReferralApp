import {
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  useMiniApp,
  useThemeParams,
  useViewport,
  useSwipeBehavior,
} from "@telegram-apps/sdk-react";
import { type FC, useEffect } from "react";
import Router from "@/pages";
import { cn, getBottomPadding } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

export const App: FC = () => {
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const swipeBehavior = useSwipeBehavior();

  useEffect(() => {
    if (swipeBehavior.supports("disableVerticalSwipe")) {
      swipeBehavior.disableVerticalSwipe();
    }
  }, [swipeBehavior]);

  useEffect(() => {
    miniApp.setHeaderColor("#1f1f1f");
  }, [miniApp]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return (
    <>
      <main
        className={cn(
          "flex flex-col items-center h-full overflow-y-scroll",
          getBottomPadding()
        )}
      >
        <Router />
      </main>
      <Toaster />
    </>
  );
};
