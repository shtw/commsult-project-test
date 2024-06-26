"use client";

import { AnimatePresence, motion } from "framer-motion";
import Loader from "@/icons/loader";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, visibility: "visible" }}
        animate={{ opacity: 0, visibility: "hidden" }}
        transition={{ ease: "easeIn", duration: 1 }}
        className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white"
        key={"loader"}
      >
        <div className="h-[42px] w-[42px] animate-spin">
          <Loader />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.5 }}
        key={"main-content"}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
