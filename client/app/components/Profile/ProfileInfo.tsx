import { styles } from "../../styles/styles";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";

import { AiOutlineCamera } from "react-icons/ai";
import avatarDefault from "../../../public/assets/avatardefault.jpg";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  user: any;
  avatar: string | null;
};

const ProfileInfo: FC<Props> = ({ user, avatar }) => {
  const [name, setName] = useState(user && user.name);
  const [loadUser, setLoadUser] = useState(false);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [
    editProfile,
    { isSuccess: success, error: UpdatedError },
  ] = useEditProfileMutation();

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target?.files[0]);
  };
  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || UpdatedError) {
      console.log(error);
    }
    if (success) {
      toast.success("User updated successfully");
    }
  }, [isSuccess, success, error, UpdatedError]);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editProfile(name);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={
              user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
            }
            alt="Profile Photo"
            width={120}
            height={120}
            className="w-[120px] object-cover h-[120px] cursor-pointer border-[3px] border-[#30bbb2ca] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />

      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%] dark:text-white text-black pt-2">
              <label className="block" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <br />
            <div className="w-[100%] dark:text-white text-black pt-2">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                type="text"
                readOnly
                id="email"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={user && user.email}
              />
            </div>
            <br />
            <input
              type="submit"
              className="w-full 800px:w-[250px] h-[40px] border border-[cyan] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer"
              required
              value="Update"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
