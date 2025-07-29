import { useGetCourseDetailsQuery } from "@/redux/features/courses/courseApi";
import React, { FC, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer/Footer";
import CourseDetails from "./CourseDetails";

type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetCourseDetailsQuery(id);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title={`${data?.course?.name}-ELearning`}
            description="ELearning is a platform for online learning and education."
            keywords={data?.course?.tags}
          />
          <Header
            route={route}
            open={open}
            setRoute={setRoute}
            setOpen={setOpen}
            activeItem={1}
          />
          <CourseDetails data={data.course} />
          <Footer />
        </>
      )}
    </>
  );
};

export default CourseDetailsPage;
