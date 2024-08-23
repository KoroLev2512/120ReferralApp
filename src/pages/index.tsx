import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ScrollRestoration from "@/components/scroll-restoration";
import Loading from "./loading";
import Login from "./login";
import { UnlockProvider } from "@/providers/useUnlock";

const OnboardingPage = lazy(() => import("./onboarding"));
const GalleryPage = lazy(() => import("./gallery"));

export default function Router() {
  return (
    <UnlockProvider>
        <BrowserRouter basename="/referal">
            <ScrollRestoration />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route
                path="/onboarding"
                element={
                    <Suspense fallback={<Loading />}>
                    <OnboardingPage />
                    </Suspense>
                }
                />
                <Route
                path="/gallery"
                element={
                    <Suspense fallback={<Loading />}>
                    <GalleryPage />
                    </Suspense>
                }
                />
                <Route path="*" element={<div>Unmatched route</div>} />
            </Routes>
        </BrowserRouter>
    </UnlockProvider>
  );
}
