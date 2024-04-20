"use client";

import { AnimatePresence, LazyMotion, m } from "framer-motion";
// import Loader from "@/icons/loader";

const loadFeature = () =>
  import("@/lib/dom-animation").then((res) => res.default);

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={loadFeature}>
      <AnimatePresence mode="wait">
        {/* <m.div
          initial={{ y: 0, opacity: 1, visibility: "visible" }}
          animate={{ y: -20, opacity: 0, visibility: "hidden" }}
          transition={{ duration: 0.5 }}
          className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white"
          key={"loader"}
        >
          <div className="h-[42px] w-[42px] animate-spin">
            <Loader />
          </div>
        </m.div> */}
        <m.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.3 }}
          key={"main-content"}
        >
          ``
          {children}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
