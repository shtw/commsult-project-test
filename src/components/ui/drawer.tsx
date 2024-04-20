import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { XIcon } from "lucide-react";
import Image from "next/image";

const loadFeature = () =>
  import("@/lib/dom-animation").then((res) => res.default);

export const Drawer = ({
  children,
  open,
  setOpen,
}: {
  children: React.ReactNode;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <LazyMotion features={loadFeature}>
          <m.div
            className="fixed top-0 z-50 h-12 w-full bg-gradient-down from-primary to-primary-darken"
            initial="hidden"
            animate="open"
            exit="hidden"
            variants={{
              open: { y: 0 },
              hidden: { y: "-100%" },
            }}
            transition={{ duration: 0.7 }}
            key={"drawer-top"}
          >
            <div className="container flex h-12 items-center">
              <a href="/" className="w-6/12 lg:w-2/12">
                <Image
                  src="/images/ontego-bussines-mobility.svg"
                  width={165}
                  height={22}
                  alt="ontego business mobility"
                />
              </a>
            </div>
          </m.div>
          <m.div
            className="fixed bottom-0 z-50 h-[calc(100vh-48px)] w-full items-center overflow-scroll bg-white pb-20"
            initial="hidden"
            animate="open"
            exit="hidden"
            variants={{
              open: { y: 0 },
              hidden: { y: "100%" },
            }}
            transition={{ duration: 0.7 }}
            key={"drawer-bottom"}
          >
            <button
              className="absolute right-10 top-10"
              onClick={() => setOpen(false)}
            >
              <XIcon />
            </button>
            <div className="container-sm pt-[100px]">{children}</div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>
  );
};
