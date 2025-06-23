"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

type Props = {};

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  return (
    <div
      className="flex 
    items-center
    justify-center
    mx-4 "
    >
      {theme === "light" ? (
        <BiMoon
          className=" cursor-pointer"
          fill="black"
          size={25}
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          className=" cursor-pointer"
          onClick={() => setTheme("light")}
          size={25}
        />
      )}
    </div>
  );
};
