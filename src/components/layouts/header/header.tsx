"use client";

import Image from "next/image";
import { menu } from "@/data/menu";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BurgerMenu, Nav, NavBottom } from "./nav";
import { useState } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const NavVariant = cva(
  "max-lg:fixed max-lg:left-1/2 max-lg:right-1/2 max-lg:mx-[-50vw] max-lg:w-screen max-lg:opacity-0 max-lg:invisible",
  {
    variants: {
      expand: {
        true: "max-lg:top-12 max-lg:border-t max-lg:border-t-white max-lg:opacity-100 max-lg:visible",
      },
    },
  },
);

const HeaderVariant = cva(
  "h-12 bg-gradient-down from-primary to-primary-darken transition-height",
  {
    variants: {
      expand: {
        true: "max-lg:h-screen",
      },
    },
  },
);

export default function Header() {
  const [expandMenu, setExpandMenu] = useState<boolean>(false);
  return (
    <header className="fixed z-50 w-full">
      <div className={cn(HeaderVariant({ expand: expandMenu }))}>
        <div className="container flex h-12 flex-wrap items-center justify-center">
          <a href="/" className="w-6/12 lg:w-2/12">
            <Image
              src="/images/ontego-bussines-mobility.svg"
              width={165}
              height={22}
              alt="ontego business mobility"
            />
          </a>
          <div className="w-6/12 text-right  lg:hidden">
            <BurgerMenu expand={expandMenu} setExpand={setExpandMenu} />
          </div>
          <div className="lg:w-8/12">
            <nav className={cn(NavVariant({ expand: expandMenu }))}>
              <Nav items={menu} />
            </nav>
          </div>
          <div className="hidden lg:block lg:w-2/12">
            <Button
              variant={"secondary"}
              size={"xs"}
              align={"between"}
              full
              asChild
            >
              <Link href={"#"}>
                <span>Demo anfragen</span>
                <ArrowRight width={18} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <NavBottom items={menu} />
    </header>
  );
}

function LinkDemo() {
  return (
    <Link
      href="#"
      className="flex h-8 min-w-[150px] items-center justify-between border border-white bg-transparent px-4 text-[12px] text-white transition-[color,box-shadow] duration-700 hover:text-primary hover:shadow-[inset_13rem_0_0_0] hover:shadow-white"
    >
      <span>Demo anfragen</span>
      <ArrowRight width={18} />
    </Link>
  );
}
