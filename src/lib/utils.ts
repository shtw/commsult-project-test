import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { StoreApi, UseBoundStore } from "zustand";

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

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export function slugify(str: string) {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function filterItemClass(name: string) {
  return "filter-" + slugify(name);
}
