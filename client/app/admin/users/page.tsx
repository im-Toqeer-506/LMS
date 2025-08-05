"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import AdminSideBar from "../../components/Admin/sideBar/AdminSideBar";
import AllUsers from "../../components/Admin/Users/AllUsers";
import React from "react";

const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Admin - ELearning"
          description="ELearning is a platform for online learning and education."
          keywords="ELearning, online learning, education, courses, tutorials, training"
        />
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="1500px:w-[16%] w-1/5">
            <AdminSideBar />
          </div>
          {/* Dashboard Hero */}
          <div className="w-4/5 p-4">
            <DashboardHero />
            <AllUsers />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
