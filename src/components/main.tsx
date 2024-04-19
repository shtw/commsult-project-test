"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext } from "react";

interface MainContextProps {
  mobile: boolean | null;
}

export const MainContext = createContext<MainContextProps>({
  mobile: null,
});

export const useMainContext = () => useContext(MainContext);

export default function Main({
  children,
  mobile,
}: {
  children: ReactNode;
  mobile: boolean | null;
}) {
  const pathname = usePathname();
  return (
    <MainContext.Provider value={{ mobile }}>
      <main className={cn(pathname !== "/" ? "pt-20 lg:pt-56" : "")}>
        {children}
      </main>
    </MainContext.Provider>
  );
}
