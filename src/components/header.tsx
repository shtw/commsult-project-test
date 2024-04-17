import Image from "next/image";
import { menu as menuItems } from "@/data/menu";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function Menu() {
  return (
    <ul className="flex h-full items-center justify-center">
      {menuItems.map((menu, index) => (
        <li className="group/nav" key={index}>
          <a
            href="#"
            className="transition-color block h-full w-[140px] text-center text-sm font-medium leading-[48px] text-white duration-300 group-hover/nav:bg-white group-hover/nav:text-primary"
          >
            {menu.label}
          </a>
          {menu?.children && (
            <div className="fixed left-0 hidden w-full bg-white py-7 shadow-3xl hover:bg-grey group-hover/nav:flex">
              <div className="container grid grid-cols-12 justify-between">
                {menu?.showLogo && (
                  <div className="col-span-2 pl-[75px]">
                    <Image
                      src="/images/ontego-subline.svg"
                      width={104}
                      height={55}
                      alt="ontego subline"
                    />
                  </div>
                )}

                <div className="col-start-4 col-end-13 flex gap-[60px]">
                  {menu?.children?.map((sub, subIndex) => (
                    <ul key={subIndex}>
                      <li className={`group/nav-sub`}>
                        <a
                          href="#"
                          className="inline-block font-heading text-[20px] font-bold leading-[26px]"
                        >
                          <div className="mb-2">
                            <span
                              className={`mr-4 inline-block border-primary group-hover/nav-sub:mb-[-2px] group-hover/nav-sub:border-b-2`}
                            >
                              {sub.label}
                            </span>
                          </div>
                        </a>
                        {sub.description && (
                          <p className="w-[150px] text-sm italic text-mute">
                            {sub.description}
                          </p>
                        )}
                        {sub?.children && (
                          <ul>
                            {sub?.children?.map((child, childIndex) => (
                              <li key={childIndex}>
                                <a
                                  href="#"
                                  className="text-[13px] font-light tracking-[0.2px] text-secondary-text hover:font-medium hover:text-primary"
                                >
                                  <span>{child.label}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
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

export default function Header() {
  return (
    <>
      <div className="fixed z-50 w-full bg-gradient-down from-primary to-primary-darken">
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
            <Menu />
          </nav>
          <div className="col-span-2">
            <LinkDemo />
          </div>
        </div>
      </div>
      <div className="h-20 shadow-3xl"></div>
    </>
  );
}
