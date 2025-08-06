"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
import FAQ from "../components/Route/FAQ";

const Page = () => {
  const [open, setOpen] = useState(false);
  const [activeItem] = useState(4);
  const [route, setRoute] = useState("Login");
  return (
    <div className="min-h-screen">
      <Heading
        title="FAQS - ELearning"
        description="ELearning is a learning management system for helping programmers"
        keywords="programming,MERN"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <br />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Page;
