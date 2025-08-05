import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { ThemeSwitcher } from "../../utils/ThemeSwitcher";
import { FC, useEffect, useRef, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
type Props = {
  open?: boolean;
  setOpen?: any;
};
import { format } from "timeago.js";
const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [
    updateNotificationStatus,
    { isSuccess },
  ] = useUpdateNotificationStatusMutation();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(
        "https://res.cloudinary.com/dasdrngo1/video/upload/v1715355770/notifications/mixkit-bubble-pop-up-alert-notification-2357_wbwviv.wav"
      );
    }
  }, []);

  const playNotificationSound = () => {
    audioRef.current?.play().catch((err) => {
      console.error("Error Audio Playing: ", err);
    });
  };
  /*
  When notification data is available, store only the unread ones in state.Also, if a notification status was updated successfully, refetch the list. 
  */
  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
  }, [data, isSuccess,refetch]);

  /*
Set up a socket listener for real-time "newNotification" events from the server. When a new notification arrives, it refetches the notification list and plays a sound.
*/
  useEffect(() => {
    socket.on("newNotification", (data) => {
      if (data) {
        refetch();
      }
      playNotificationSound();
    });
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };
  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0">
      <ThemeSwitcher />
      {/* Notification bell icon */}
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer text-black dark:text-white" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-5 h-5 text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {/* Notification dropdown - shown only if `open` is true */}
      {open && (
        <div
          className="w-[350px] h-[50vh] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-10 rounded"
          ref={dropdownRef}
        >
          {/* Header */}
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                key={index}
                className="dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item.title}</p>
                  <p
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white">
                  {item.message}
                </p>
                <p className="p-2 text-black dark:text-white text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default DashboardHeader;
