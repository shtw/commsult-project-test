import Image from "next/image";
import { menu } from "@/data/menu";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Nav, NavBottom } from "./nav";

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

export default function Header() {
  return (
    <header className="fixed z-50 w-full">
      <div className="bg-gradient-down from-primary to-primary-darken">
        <div className="container grid grid-cols-12 items-center">
          <a href="/" className="col-span-2">
            <Image
              src="/images/ontego-bussines-mobility.svg"
              width={165}
              height={22}
              alt="ontego business mobility"
              style={{ width: "100%", height: "auto" }}
            />
          </a>

          <nav className="col-span-8">
            <Nav items={menu} />
          </nav>
          <div className="col-span-2">
            <LinkDemo />
          </div>
        </div>
      </div>
      <NavBottom items={menu} />
    </header>
  );
}
