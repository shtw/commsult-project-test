"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function Main({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <main className={cn(pathname !== "/" ? "pt-20 lg:pt-56" : "")}>
      {children}
    </main>
  );
}
