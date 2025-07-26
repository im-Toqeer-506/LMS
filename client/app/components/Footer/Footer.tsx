import Link from "next/link";

// type Props = object;

const Footer = () => {
  return (
    <footer>
      <div className="border border-[#ffffff1e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="/about"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="/faq"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="/courses"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="/profile"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="/course-dashboard"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="https://www.youtube.com/"
                >
                  Youtube
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="https://www.instagram.com/"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2"
                  href="https://github.com/im-Toqeer-506"
                >
                  github
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Newsletter
            </h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Stay up-to-date with everything related to our brand and gain
              invaluable insights for your programming journey by subscribing to
              our newsletter.
            </p>
            <Link
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-block"
              href={`mailto:muhammadtoqeerzia18@gmail.com`}
            >
              Connect
            </Link>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          Copyright &copy; 2025 ELearning | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
