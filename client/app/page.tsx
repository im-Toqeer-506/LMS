"use client";
import React, { FC, useEffect, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/Route/FAQ";
import Footer from "./components/Footer/Footer";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const { data, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  useEffect(() => {
    socket.on("connection", () => {});
  }, []);
  return (
    <div>
      <Heading
        title="ELearning"
        description="ELearning is a platform for online learning and education."
        keywords="ELearning, online learning, education, courses, tutorials, training"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
