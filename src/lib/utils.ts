import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { APP_URL } from "./const";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function retrieveLocale() {
  const user = retrieveUserSafely();
  return user.languageCode === "ru" ? "ru" : "en";
}

export function createRefCode() {
  const user = retrieveUserSafely();
  return btoa(`${user.id}`);
}

export function createRefLink() {
  return APP_URL + "?startapp=" + createRefCode();
}

export function retrieveRefCode() {
  const { startParam } = retrieveLaunchParams();
  if (!startParam) {
    return null;
  }

  return atob(startParam);
}

// export function parseRefLink() {
//   const { startParam } = retrieveLaunchParams();
//   if (!startParam) {
//     return null;
//   }

//   return +atob(startParam);
// }

export function getBottomPadding() {
  const lp = retrieveLaunchParams();
  return ["ios", "android"].includes(lp.platform) ? "pb-8" : "pb-4";
}

export function retrieveUserSafely() {
  const { initData } = retrieveLaunchParams();

  if (!initData || !initData.user) {
    throw new Error("Cannot fetch user without initData");
  }

  return initData.user;
}
