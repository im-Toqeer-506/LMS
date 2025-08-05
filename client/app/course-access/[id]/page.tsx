"use client";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect, useParams } from "next/navigation";
import React, { useEffect } from "react";
import CourseContent from "../../components/Courses/CourseContent";
import Footer from "@/app/components/Footer/Footer";

const Page = () => {
  const params = useParams();
  const id = params?.id as string;
  const { isLoading, error, data } = useLoadUserQuery(undefined, {});
  useEffect(() => {
    if (data) {
      const isPurchased =
        data && data.user.courses.find((item: any) => item._id === id);
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
  }, [data, error,id,isLoading]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data?.user} />
          <Footer />
        </div>
      )}
    </>
  );
};

export default Page;
