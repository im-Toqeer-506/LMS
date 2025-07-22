"use client";
import Heading from "../utils/Heading";
import React from "react";
import AdminSideBar from "../components/Admin/sideBar/AdminSideBar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

type Props = {};

const Page = (props: Props) => {
  return (
    <AdminProtected>
      <Heading
        title="Admin - ELearning"
        description="ELearning is a platform for online learning and education."
        keywords="ELearning, online learning, education, courses, tutorials, training"
      />
      <div className="flex h-[200vh]">
        {/* Sidebar */}
        <div className="1500px:w-[16%] w-1/5">
          <AdminSideBar />
        </div>
        {/* Dashboard Hero */}
        <div className="w-4/5 p-4">
          <DashboardHero isDashboard={true} />
        </div>
      </div>
    </AdminProtected>
  );
};

export default Page;
