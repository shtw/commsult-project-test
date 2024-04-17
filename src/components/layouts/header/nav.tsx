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
      1: "group/nav",
      2: "group/nav-sub",
      3: "",
    },
  },
});

const MenuLinkVariant = cva("", {
  variants: {
    level: {
      1: "transition-color block h-full w-[140px] text-center text-sm font-medium leading-[48px] text-white duration-300 group-hover/nav:bg-white group-hover/nav:text-primary",
      2: "inline-block font-heading text-[20px] font-bold leading-[26px] text-black",
      3: "text-[13px] font-light tracking-[0.2px] text-secondary-text hover:font-medium hover:text-primary",
    },
  },
});

const MenuLabelVariant = cva("", {
  variants: {
    level: {
      1: "",
      2: "mr-4 inline-block border-primary group-hover/nav-sub:mb-[-2px] group-hover/nav-sub:border-b-2",
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
        <p className="w-[150px] text-sm italic text-mute">{menu.description}</p>
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
    <div className="container grid grid-cols-12 justify-between">
      {showLogo && (
        <div className="col-span-2 pl-[75px]">
          <Image
            src="/images/ontego-subline.svg"
            width={104}
            height={55}
            alt="ontego subline"
          />
        </div>
      )}
      <div className="relative col-start-4 col-end-13 flex gap-[60px]">
        {children}
      </div>
    </div>
  </>
);

const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <ul className="flex h-full items-center justify-center">{children}</ul>
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
            <MenuDropdown>
              <MenuDropdownContent showLogo={parentMenu.showLogo}>
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
    console.log(parentMenu);
    return items?.find((item) => item.link === parentMenu);
  }, [items, parentMenu]);

  console.log(menu);

  if (menu) {
    return (
      <div className="bg-white py-4 shadow-3xl">
        <MenuDropdownContent showLogo={menu?.showLogo}>
          {menu.children?.map((childMenu, cid) => (
            <MenuList>
              <MenuItem menu={childMenu} level={2}>
                <MenuList collapsible>
                  {childMenu?.children?.map((grandChildMenu, gid) => (
                    <MenuItem menu={grandChildMenu} level={3}></MenuItem>
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
