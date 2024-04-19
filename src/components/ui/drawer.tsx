import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { XIcon } from "lucide-react";
import Image from "next/image";

const DrawerTopVariant = cva(
  "fixed h-12 w-full bg-gradient-down from-primary to-primary-darken top-0 z-50 -translate-y-full transition-transform duration-700",
  {
    variants: {
      open: {
        true: "translate-y-0",
      },
    },
  },
);

const DrawerContentVariant = cva(
  "fixed h-[calc(100vh-48px)] w-full bg-white bottom-0 z-50 translate-y-full items-center transition-transform duration-700 overflow-scroll pb-20",
  {
    variants: {
      open: {
        true: "translate-y-0",
      },
    },
  },
);

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
    <div>
      <div className={cn(DrawerTopVariant({ open }))}>
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
      </div>
      <div className={cn(DrawerContentVariant({ open }))}>
        <button
          className="absolute right-10 top-10"
          onClick={() => setOpen(false)}
        >
          <XIcon />
        </button>
        <div className="container-sm pt-[100px]">{children}</div>
      </div>
    </div>
  );
};
