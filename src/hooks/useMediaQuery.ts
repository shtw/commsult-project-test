"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean | null>(null);

  const getMatches = (query: string): boolean => {
    return window.matchMedia(query).matches;
  };

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMatchChange = () => {
      setMatches(getMatches(query));
    };
    handleMatchChange();
    mediaQueryList.addEventListener("change", handleMatchChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleMatchChange);
    };
  }, [query]);

  return matches;
}
