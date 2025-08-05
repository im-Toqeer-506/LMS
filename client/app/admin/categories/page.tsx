"use client";

import AdminDashboardHero from "../../components/Admin/DashboardHero";
import AdminSidebar from "../../components/Admin/sideBar/AdminSideBar";
import AdminProtected from "../../hooks/adminProtected";
import Headings from "@/app/utils/Heading";
import EditCategories from "../../components/Admin/Customization/EditCategories";



const Page = () => {
  return (
    <div>
      <AdminProtected>
        <Headings
          title="ELearning Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux,AI/ML"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-1/6 w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <AdminDashboardHero />
            <EditCategories />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
