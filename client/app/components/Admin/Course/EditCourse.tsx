import React, { FC, useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import {
  useEditCourseMutation,
  useGetAllCourseQuery,
} from "../../../../redux/features/courses/courseApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
type Props = {
  id: string;
};

const EditCourse: FC<Props> = ({ id }) => {
  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    categories: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoLength: "",
      videoSection: "untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
  //edit course Mutataion
  const [editCourse, { isSuccess, error }] = useEditCourseMutation();
  //get all courses mutation
  const { isLoading, data } = useGetAllCourseQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  //filtering course-data
  const EditCourseData = data && data.courses.find((i: any) => i._id === id);
  //edit-course-api-response
  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      redirect("/admin/courses");
    }
    if (error && "data" in error) {
      const errorMessage =
        (error as any).data?.message || "Failed to update course";
      toast.error(errorMessage);
    }
  }, [isSuccess, error]);
  useEffect(() => {
    if (EditCourseData) {
      setCourseInfo({
        name: EditCourseData.name,
        description: EditCourseData.description,
        price: EditCourseData.price,
        estimatedPrice: EditCourseData?.estimatedPrice,
        tags: EditCourseData.tags,
        level: EditCourseData.level,
        categories: EditCourseData.categories,
        demoUrl: EditCourseData.demoUrl,
        thumbnail: EditCourseData?.thumbnail?.url,
      });
      setBenefits(EditCourseData.benefits);
      setPrerequisites(EditCourseData.prerequisites);
      setCourseContentData(EditCourseData.courseData);
    }
  }, [EditCourseData]);
  //Submits the course data to the API
  const handleCourseCreate = async () => {
    if (!isLoading && courseData) {
      await editCourse({ id: EditCourseData._id, data: courseData });
    }
  };

  // Formating all course input data into Object
  const handleSubmit =  () => {
    //format benfits array
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    //format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    //format course content Array
    const formattedCourseContentData = courseContentData.map((content) => ({
      videoUrl: content.videoUrl,
      title: content.title,
      description: content.description,
      videoLength: content.videoLength,
      videoSection: content.videoSection,
      links: content.links.map((link) => ({
        title: link.title,
        url: link.url,
      })),
      suggestion: content.suggestion,
    }));
    //Prepare our data object
    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      categories: courseInfo.categories,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };
    setCourseData(data);
  };
  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            active={active}
            isEdit={true}
            setActive={setActive}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0  p-4">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
