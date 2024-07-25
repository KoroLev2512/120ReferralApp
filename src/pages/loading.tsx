import { useEffect } from "react";

export default function Loading() {
  useEffect(() => {
    console.log("Started lazy loading page...");
    window.showLoader();

    return window.hideLoader;
  }, []);

  return null;
}
