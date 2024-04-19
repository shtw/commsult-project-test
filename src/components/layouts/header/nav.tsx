"use client";

import { cva } from "class-variance-authority";
import { cn, getCurrentParentMenu, getSelectedMenu } from "@/lib/utils";
import { ReactNode, useMemo } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  label: string;
  link: string;
  showLogo?: boolean;
  description?: string;
  children?: MenuItemProps[];
}

const MenuItemVariant = cva("", {
  variants: {
    level: {
      1: "group/nav max-lg:flex-1",
      2: "group/nav-sub",
      3: "",
    },
  },
});

const MenuLinkVariant = cva("", {
  variants: {
    level: {
      1: "transition-color block max-lg:text-clip max-lg:overflow-hidden max-lg:h-12 lg:h-full flex-1 lg:w-[140px] text-center text-sm font-medium leading-[48px] text-white duration-300 group-hover/nav:bg-white group-hover/nav:text-primary",
      2: "inline-block font-heading text-[20px] font-bold leading-[26px] text-black",
      3: "text-[13px] font-light tracking-[0.2px] text-secondary-text hover:font-medium hover:text-primary",
    },
  },
});

const MenuLabelVariant = cva("", {
  variants: {
    level: {
      1: "",
      2: "lg:mr-4 inline-block border-primary group-hover/nav-sub:mb-[-2px] group-hover/nav-sub:border-b-2",
      3: "",
    },
  },
});

const MenuListVariant = cva("", {
  variants: {
    collapsible: {
      false: "",
      true: "flex hidden group-hover/nav-sub:flex absolute left-0 gap-7",
    },
  },
});

const MenuItem = ({
  children,
  menu,
  level,
  showDescription,
}: {
  children?: ReactNode;
  menu: MenuItemProps;
  level: 1 | 2 | 3;
  showDescription?: boolean;
}) => {
  return (
    <li className={cn(MenuItemVariant({ level }))}>
      <a href={menu.link} className={cn(MenuLinkVariant({ level }))}>
        {level === 2 ? (
          <div className="mb-2">
            <span className={cn(MenuLabelVariant({ level }))}>
              {menu.label}
            </span>
          </div>
        ) : (
          menu.label
        )}
      </a>
      {showDescription && menu.description && level === 2 ? (
        <p className="w-[150px] font-heading text-sm italic text-mute max-lg:mx-auto">
          {menu.description}
        </p>
      ) : null}
      {children ? children : null}
    </li>
  );
};

const MenuDropdown = ({ children }: { children: ReactNode }) => (
  <div className="fixed left-0 z-50 hidden w-full bg-white py-7 shadow-3xl hover:bg-grey group-hover/nav:flex">
    {children}
  </div>
);

const MenuDropdownContent = ({
  children,
  showLogo,
}: {
  children: ReactNode;
  showLogo?: boolean;
}) => (
  <>
    <div className="container flex flex-wrap justify-between max-lg:flex-col max-lg:justify-center max-lg:text-center">
      <div className="mx-auto lg:w-3/12">
        {showLogo && (
          <Image
            src="/images/ontego-subline.svg"
            width={104}
            height={55}
            alt="ontego subline"
            className="w-auto max-lg:mb-[60px] lg:pl-[75px]"
          />
        )}
      </div>
      <div className="relative flex gap-[60px] max-lg:flex-col max-lg:justify-center  lg:w-9/12">
        {children}
      </div>
    </div>
  </>
);

const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="flex items-center justify-center lg:h-full">{children}</ul>
  );
};

const MenuList = ({
  children,
  collapsible,
}: {
  children: ReactNode;
  collapsible?: boolean;
}) => {
  return <ul className={cn(MenuListVariant({ collapsible }))}>{children}</ul>;
};

export const Nav = ({ items }: { items: MenuItemProps[] }) => {
  return (
    <Menu>
      {items.map((parentMenu, pid) => (
        <MenuItem menu={parentMenu} level={1} key={pid}>
          {parentMenu.children ? (
            <MenuDropdown key={pid}>
              <MenuDropdownContent showLogo={parentMenu.showLogo} key={pid}>
                {parentMenu.children?.map((childMenu, cid) => (
                  <MenuList key={cid}>
                    <MenuItem menu={childMenu} level={2} showDescription>
                      {childMenu?.children?.map((grandChildMenu, gid) => (
                        <MenuList key={gid}>
                          <MenuItem menu={grandChildMenu} level={3}></MenuItem>
                        </MenuList>
                      ))}
                    </MenuItem>
                  </MenuList>
                ))}
              </MenuDropdownContent>
            </MenuDropdown>
          ) : null}
        </MenuItem>
      ))}
    </Menu>
  );
};

export const NavBottom = ({ items }: { items: MenuItemProps[] }) => {
  const pathname = usePathname();
  const parentMenu = getCurrentParentMenu(pathname);

  const menu = useMemo(() => {
    return items?.find((item) => item.link === parentMenu);
  }, [items, parentMenu]);

  if (menu) {
    return (
      <div className="hidden bg-white py-4 shadow-3xl lg:block">
        <MenuDropdownContent showLogo={menu?.showLogo} key={"menuDropdown"}>
          {menu.children?.map((childMenu, cid) => (
            <MenuList key={cid}>
              <MenuItem menu={childMenu} level={2}>
                <MenuList collapsible>
                  {childMenu?.children?.map((grandChildMenu, gid) => (
                    <MenuItem
                      menu={grandChildMenu}
                      level={3}
                      key={gid}
                    ></MenuItem>
                  ))}
                </MenuList>
              </MenuItem>
            </MenuList>
          ))}
        </MenuDropdownContent>
      </div>
    );
  }

  return null;
};

const BurgetMenuVariant = cva(
  `relative h-[22px] w-[22px] [&>span]:transition [&>span]:duration-150 [&>span]:ease-out
  [&>span]:absolute [&>span]:left-0 [&>span]:w-full [&>span]:rotate-0 [&>span]:bg-white [&>span]:opacity-100 [&>span]:h-[2px] 
  [&>span:first-child]:top-0 [&>span:nth-child(2)]:top-1.5 [&>span:nth-child(3)]:top-1.5 [&>span:last-child]:top-3`,
  {
    variants: {
      expand: {
        true: "[&>span:first-child]:w-0 [&>span:last-child]:w-0 [&>span:nth-child(2)]:rotate-45 [&>span:nth-child(3)]:-rotate-45 ",
      },
    },
  },
);

export const BurgerMenu = ({
  expand,
  setExpand,
}: {
  expand: boolean;
  setExpand: (value: boolean) => void;
}) => {
  return (
    <button
      className={cn(BurgetMenuVariant({ expand }))}
      onClick={() => setExpand(!expand)}
    >
      {Array.from(Array(4).keys()).map((i) => (
        <span key={i}></span>
      ))}
    </button>
  );
};
