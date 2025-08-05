import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItem";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModel from "../utils/CustomModel";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import Login from "../components/Auth/Login";
import SignUP from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/assets/avatardefault.jpg";
import { useSession } from "next-auth/react";
import {
  useLogoutQuery,
  useSocialAuthMutation,
} from "../../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, open, route, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { data } = useSession();
  const { data: userData, isLoading, refetch } = useLoadUserQuery(
    undefined,
    {}
  );
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, SetLogOut] = useState(false);
  const {} = useLogoutQuery(undefined, {
    skip: !logout ? true : false,
  });
  // Handles user authentication  based on social login data , loading state, and login success.
  useEffect(() => {
    // If no user is found in Redux but NextAuth session exists, it means
    // the user logged in via social login and we need to sync with our backend
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch();
        }
      }
    }
    if (data === null && isSuccess) {
      toast.success("Welcome back to ELearning!");
      setOpen(false);
    }
    if (data === null && !isLoading && !userData) {
      SetLogOut(true);
    }
  }, [data, isLoading, isSuccess, refetch, setOpen, socialAuth, userData]);
  //Based on the user Scrool change the scroll at once
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 85) {
        setActive(true);
      } else {
        setActive(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSideBar(false);
    }
  };
  return (
    <div className="w-full relative ">
      {/* Sticky and styled header depending on scroll */}
      <div
        className={`${
          active
            ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 bg-black"
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2  h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* Logo */}
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-Poppins font-[500] text-black dark:text-white "
              >
                ELearning
              </Link>
            </div>
            {/* Navigation section */}
            <div className="flex items-center">
              {/* Desktop nav items */}
              <NavItems activeItem={activeItem} isMobile={false} />
              {/* Theme toggle */}
              <ThemeSwitcher />
              {/* Mobile menu icon */}
              <div className="800px:hidden ">
                <HiOutlineMenuAlt3
                  className="cursor-pointer dark:text-white text-black  "
                  onClick={() => setOpenSideBar(true)}
                />
              </div>
              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={userData.avatar ? userData.avatar.url : avatar}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer hidden 800px:block"
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer hidden   800px:block dark:text-white text-black  "
                  onClick={() => setOpen(true)}
                />
              )}
            </div>
          </div>
        </div>
        {/* Mobile sidebar menu */}
        {openSideBar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[999999999] h-screen bg-white top-0 right-0 dark:bg-slate-900 dark:bg-opacity-90">
              <NavItems activeItem={activeItem} isMobile={true} />

              {userData ? (
                <Link href={"/profile"}>
                  <Image
                    src={userData.avatar ? userData.avatar.url : avatar}
                    alt=""
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] rounded-full cursor-pointer ml-[20px] "
                    style={{
                      border: activeItem === 5 ? "2px solid #37a39a" : "",
                    }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyrigt ©️ 2025 E-Learning
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Login}
          refetch={refetch}
        />
      )}
      {route === "Sign-Up" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={SignUP}
        />
      )}
      {route === "verification" && open && (
        <CustomModel
          open={open}
          setOpen={setOpen}
          setRoute={setRoute}
          activeItem={activeItem}
          component={Verification}
        />
      )}
    </div>
  );
};
export default Header;
