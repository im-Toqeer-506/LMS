import { styles } from "@/app/styles/styles";
import React, { FC } from "react";
import toast from "react-hot-toast";
import { AiOutlinePlusCircle } from "react-icons/ai";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prequisites: { title: string }[];
  setPrerequisites: (prequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setPrerequisites,
  setBenefits,
  active,
  setActive,
  prequisites,
}) => {
  // Updating the title of a benefit at a specific index
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = benefits.map((b, i) =>
      i == index ? { ...b, title: value } : b
    );
    setBenefits(updatedBenefits);
  };

  // Adds a new empty benefit input field
  const handleAddPrerequisites = () => {
    setPrerequisites([...prequisites, { title: "" }]);
  };
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  // Updates the title of a prerequisite at a specific index
  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = prequisites.map((p, i) =>
      i === index ? { ...p, title: value } : p
    );
    setPrerequisites(updatedPrerequisites);
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  // Validates all inputs and moves to the next step if filled, otherwise shows error
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prequisites[prequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields before proceeding.");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-15 800px:mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benefits"
            placeholder="You will be able to build a full stack LMS Platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefit}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="email">
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prequisites.map((prequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name=""
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${styles.input} my-2`}
            value={prequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisites}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 m-[20px] cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 m-[20px] cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
