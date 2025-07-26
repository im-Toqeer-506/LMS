import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
type Props = {};
const reviews = [
  {
    name: "Ayesha Siddiqui",
    rating: 4.7,
    avatar: "https://randomuser.me/api/portraits/women/10.jpg",
    Profession: "Student | International Islamic University",
    comment:
      "An excellent platform that really helps students stay on track with their goals. The interface is smooth, elegant, and very intuitive, making it easy to navigate even during stressful times like exams. I particularly love the task reminders and calendar integration. It keeps everything organized in one place, so I never miss a deadline. I’ve already recommended it to several classmates, and they’re loving the experience as well.",
  },
  {
    name: "Ahmed Khan",
    rating: 4.2,
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    Profession: "Software Engineer | ZainTech",
    comment:
      "I found the features to be quite useful, especially for managing my daily tasks and work priorities. The UI is clean, responsive, and professional. It’s great for productivity, and I like how it integrates well with other tools I already use. There’s definitely room for improvement in performance speed, but overall, I’m happy with how it enhances my workflow. I’m definitely looking forward to future updates and enhancements.",
  },
  {
    name: "Fatima Noor",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    Profession: "UX Researcher | Crescent Labs",
    comment:
      "Absolutely love how intuitive the interface is. It has a modern design and thoughtful features that make my daily workflow smoother. As a UX researcher, I really appreciate the attention to usability and accessibility. It reduces cognitive load and helps my team stay in sync on projects. From organizing tasks to real-time collaboration, this platform has really enhanced our productivity. It’s rare to find such a polished and practical tool.",
  },
  {
    name: "Hassan Ali",
    rating: 3.9,
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    Profession: "Project Manager | Al-Falah Solutions",
    comment:
      "Very helpful overall. It offers a comprehensive set of tools that any project manager would find valuable. The dashboards are well-organized, and the ability to assign tasks and track progress is excellent. While there are a few minor bugs here and there, the support team has been fantastic. They respond quickly and take user feedback seriously. It’s a growing product, and I’m optimistic about its future development.",
  },
  {
    name: "Zainab Rahman",
    rating: 4.5,
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    Profession: "Educator | Dar-ul-Uloom Online",
    comment:
      "I’ve recommended this tool to all my students and fellow educators because it simplifies our remote teaching experience. The platform makes it easy to share resources, schedule lessons, and track student progress. What stands out is its simplicity combined with powerful features. It’s not cluttered, which is a big plus for older students too. I’ve seen real improvement in student engagement since using this tool. It’s a real game changer.",
  },
  {
    name: "Omar Farooq",
    rating: 3.5,
    avatar: "https://randomuser.me/api/portraits/men/66.jpg",
    Profession: "Freelancer | Digital Marketing",
    comment:
      "The experience was decent, especially for someone working independently on various projects. It covers most of the basic needs, and the learning curve is not steep at all. However, I’d really appreciate more customization options to match my creative workflow. Right now, it feels a bit too structured, and that can limit flexibility. Still, it’s a solid foundation that could evolve into something great with a few updates.",
  },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center gap-10">
        {/* Left Side */}
        <div className="w-full 800px:w-[50%]">
          <Image
            src={require("../../../public/assets/bussiness.jpg")}
            alt="business"
            width={500}
            height={500}
          />
        </div>
        {/* Right  Side */}
        <div className="w-full  800px:[w-50%]">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Student are <span className="text-gradient"> Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus,
            saepe. Totam libero nesciunt quas labore fuga voluptatem ipsa
            provident officia hic, quasi vel numquam, similique illo. Veniam sed
            eligendi ad labore qui unde omnis incidunt?
          </p>
        </div>
        <br />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10 mt-8">
        {reviews &&
          reviews.map((item: any, index: number) => (
            <ReviewCard item={item} key={index} />
          ))}
      </div>
    </div>
  );
};

export default Reviews;
