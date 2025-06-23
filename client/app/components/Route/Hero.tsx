"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};
const Hero: FC<Props> = (props) => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/courses?title=${encodeURIComponent(search.trim())}`);
    }
  };
  return (
    <>
      <div className="w-full min-h-screen flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-8 py-10 lg:py-0 relative overflow-hidden">
        {/* Animated background circle */}
        <div className="absolute top-[75px] lg:left-[100px]  w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] hero_animation rounded-full opacity-20 lg:opacity-30"></div>
        {/* Hero banner Image */}
        <div className="lg:w-1/2 flex items-center justify-center z-10 mb-8 lg:mb-0">
          <Image
            src={require("../../../public/assets/hero-banner-1.png")}
            width={400}
            height={400}
            alt="Hero Banner"
            className="object-contain w-full max-w-[300px] lg:max-w-[400px] h-auto"
          />
        </div>
        {/* Hero content section */}
        <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          {/* Main headline */}
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-4 leading-tight">
            {"Improve Your Online Learning Experience"}
          </h1>
          {/* Subtitle or description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            {
              "We have 20K+ Online courses & 500k+ Online registered students. Find your desired courses from them."
            }
          </p>
          {/* Search form */}
          <form onSubmit={handleSearch} className="w-full max-w-md mb-8">
            <div className="relative">
              <input
                type="search"
                placeholder="Search Courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-12 px-4 pr-12 text-lg text-gray-700 bg-white dark:bg-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-12 w-12 flex items-center justify-center bg-blue-500 rounded-r-lg hover:bg-blue-600 transition-colors"
              >
                <BiSearch className="text-white" size={24} />
              </button>
            </div>
          </form>
          {/* Trust indicators - client avatars and text */}
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <Image
                src={require("../../../public/assets/client-1.jpg")}
                alt=""
                className="rounded-full"
              />

              <Image
                src={require("../../../public/assets/client-2.jpg")}
                alt=""
                className="rounded-full ml-[-20px]"
              />

              <Image
                src={require("../../../public/assets/client-3.jpg")}
                alt=""
                className="rounded-full ml-[-20px]"
              />
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">500K+</span> People already trust
              us.{" "}
              <Link href="/courses" className="text-blue-500 hover:underline">
                View Courses
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
