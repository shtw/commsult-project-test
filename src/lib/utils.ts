import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSelectedMenu(pathname: string): string[] {
  const str = pathname;
  const prefix = "/";
  const arr = str.split(prefix).filter((item) => item !== "");
  let result = [];
  let path = "";

  for (let i = 0; i < arr.length; i++) {
    path += prefix + arr[i];
    result.push(path);
  }
  return result;
}

export function getCurrentParentMenu(pathname: string) {
  const str = pathname;
  const prefix = "/";
  const arr = str.split(prefix).filter((item) => item !== "");

  return arr.length > 0 ? prefix + arr[0] : "";
}
