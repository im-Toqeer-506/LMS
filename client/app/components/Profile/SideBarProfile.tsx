import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/assets/avatardefault.jpg";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
type Props = {
  user: any;
  active: number;
  avatar: string | null;
  logOutHandler: any;
  setActive: (active: number) => void;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  logOutHandler,
  setActive,
}) => {
  return (
    <div className="w-full ">
      {/* Profile */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 1 ? "dark:bg-slate-800  bg-blue-50" : "bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        <Image
          alt=""
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarDefault}
          width={20}
          height={20}
          className=" cursor-pointer rounded-full"
        />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          My Account
        </h5>
      </div>
      {/* Change Password  */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 2 ? "dark:bg-slate-800  bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Change Password
        </h5>
      </div>
      {/* Enrolled Courses */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 3 ? "dark:bg-slate-800  bg-white" : "bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Enrolled Courses
        </h5>
      </div>
      {/* Logout */}
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer ${
          active === 4 ? "dark:bg-slate-800  bg-white" : "bg-transparent"
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="pl-2 800px:block hidden font-Poppins dark:text-white text-black ">
          Log Out
        </h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
