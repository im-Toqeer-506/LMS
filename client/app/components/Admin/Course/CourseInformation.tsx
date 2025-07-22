import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { styles } from "../../../styles/styles";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  active,
  setActive,
  setCourseInfo,
}) => {
  // Categories Data
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);
  // State to track drag status for file drop area
  const [dragging, setDragging] = useState(false);

  // Handles form submission, moves to the next step
  const hanndleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  // Handles image file selection and sets thumbnail preview
  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Triggered when file is dragged over drop area
  const handleDrageOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  // Triggered when drag leaves the drop area
  const handleDrageLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  // Handles drop event for thumbnail upload
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = (e: any) => {
        setCourseInfo({ ...courseInfo, thumbnail: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[80%] m-auto mt-15 800px:mt-24">
      <form onSubmit={hanndleSubmit}>
        {/* Course name input */}
        <div>
          <label htmlFor="" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="name"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack LMS platform with next 13"
            className={`${styles.input}`}
          />
        </div>
        <br />

        {/* Course description input */}
        <div className="mb-5">
          <label className={`${styles.label}`}>Course Description</label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />

        {/* Price and Estimated Price inputs */}
        <div className="w-full flex  justify-between">
          <div className="w-[45%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              id="price"
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="" className={`${styles.label}`}>
              Estimated Price
            </label>
            <input
              type="number"
              name=""
              required
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              id="price"
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />

        {/* Tags input  && Course-Categories */}
        <div className="flex justify-between w-full">
          <div className="w-[46%]">
            <label htmlFor="" className={`${styles.label}`}>
              Course Tags
            </label>
            <input
              type="name"
              name=""
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              id="name"
              placeholder="MERN,Next 13,Socket io,tailwind css,LMS"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[46%]">
            <label htmlFor="categories" className={styles.label}>
              Course Category
            </label>
            <select
              id="categories"
              className={`${styles.input} dark:bg-slate-900 dark:text-white`}
              value={courseInfo.categories}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
            >
              {categories.map((category: any) => (
                <option key={category._id} value={category.title}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        {/* Level and Demo URL inputs */}
        <div className="w-full flex justify-between">
          <div className="w-[45%]">
            <label className={`${styles.label}`}>Course Level</label>
            <input
              type="text"
              name=""
              value={courseInfo.level}
              required
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              id="level"
              placeholder="Beginner/Intermediate/Expert"
              className={`${styles.input}`}
            />
          </div>
          <div className="w-[50%]">
            <label className={`${styles.label} w-[50%]`}>Demo Url</label>
            <input
              type="text"
              name=""
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              id="demoUrl"
              placeholder="eer74fd"
              className={`${styles.input}`}
            />
          </div>
        </div>
        <br />

        {/* Thumbnail upload via file input or drag-and-drop */}
        <div className="w-full">
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            htmlFor="file"
            onDragOver={handleDrageOver}
            onDrop={handleDrop}
            onDragLeave={handleDrageLeave}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt=""
                className="max-h-full object-cover w-full"
              />
            ) : (
              <span>Drag and Drop Your Thumbnail here or click to Browse</span>
            )}
          </label>
        </div>
        <br />

        {/* Submit button to go to next step */}
        <div className="w-full flex items-center justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
