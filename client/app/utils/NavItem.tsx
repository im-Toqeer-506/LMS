import Link from "next/link";
import React, { FC } from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItem: FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index}>
              <span
                className={`${
                  activeItem === index
                    ? "dark:text-[#37a39a] text-[crimson]"
                    : "dark:text-white text-black"
                } text-[18px] px-6 font-Poppins font-[400]`}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {/* Mobile Navigation */}
      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            <Link href={"/"}>
              <span
                className={`text-[25px] font-Poppins text-black font-[500] dark:text-white`}
              >
                E-Learning
              </span>
            </Link>
          </div>
          {/* Mobile Nav Items */}
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link href={`${i.url}`} key={index}>
                <span
                  className={`${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default NavItem;
