"use client";
import Headings from "@/app/utils/Heading";
import EditFaq from "../../components/Admin/Customization/EditFaq";
import AdminProtected from "@/app/hooks/adminProtected";
import AdminSidebar from "../../components/Admin/sideBar/AdminSideBar";
import DashboardHero from "../../components/Admin/DashboardHero";

type Props = object;

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
            <DashboardHero />
            <EditFaq />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
