"use client";

import { cn } from "@/lib/utils";
import { ChevronUpIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const prevScrollPos = useRef(0);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window) {
        const currentScrollPos = window?.pageYOffset;

        if (
          currentScrollPos > 100 &&
          currentScrollPos > prevScrollPos.current
        ) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }

        prevScrollPos.current = currentScrollPos;
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={cn(
        isVisible ? "opacity-100" : "opacity-0",
        "hover:bg-primary-lighten fixed bottom-10 right-10 flex h-10 w-10 items-center justify-center rounded-[2px] bg-black/30 text-white transition-all duration-300",
      )}
      onClick={scrollToTop}
    >
      <ChevronUpIcon width={16} />
    </button>
  );
}
