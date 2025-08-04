import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import {
  useAddAnswerInQuestionMutation,
  useAddnewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "@/redux/features/courses/courseApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URI || "";
const socket = socketIO(ENDPOINT, { transports: ["websocket"] });
type Props = {
  data: any;
  id: string;
  activeVideo: number;
  user: any;
  setActiveVideo: (activeVideo: any) => void;
  refetch: any;
};
//main component
const CourseContentMedia: FC<Props> = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  user,
  refetch,
}) => {
  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");
  const [reviewId, setReviewId] = useState("");

  // Check if user already reviewed
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const course = courseData?.course;
  const isReviewsExist = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation({});
  const [
    addnewQuestion,
    { isLoading: questionCreationLoading, isSuccess: questionSuccess, error },
  ] = useAddnewQuestionMutation({});
  const [
    addReviewInCourse,
    {
      isLoading: reviewCreationLoading,
      isSuccess: reviewSuccess,
      error: reviewError,
    },
  ] = useAddReviewInCourseMutation({});
  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      isLoading: replyCreationLoading,
      error: replyError,
    },
  ] = useAddReplyInReviewMutation({});
  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can`t be Empty!");
    } else {
      addnewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };
  useEffect(() => {
    //Question Response
    if (questionSuccess) {
      setQuestion("");
      refetch();
      toast.success("Questiton Added SuccessFully!");
      socket.emit("notification", {
        title: "New Question Recived!",
        message: `You Have A New Questiton In ${data[activeVideo].title}`,
        userId: user?._id,
      });
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    // Answer Response
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer Added Successfully!");
      if (user.role !== "admin") {
        socket.emit("notification", {
          title: "New Reply Recived!",
          message: `You Have A New Questiton Reply In  ${data[activeVideo].title}`,
          userId: user?._id,
        });
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = answerError as any;
        toast.error(errorMessage.data.message);
      }
    }
    // Review Response
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      courseRefetch();
      toast.success("Review Added SuccessFully!");
      socket.emit("notification", {
        title: "A New FeedBack Recived!",
        message: `You Have A New Feedback In ${data[activeVideo].title}`,
        userId: user?._id,
      });
    }
    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = reviewError as any;
        toast.error(errorMessage.data.message);
      }
    }
    //reply response
    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply Added SuccessFully!");
    }
    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [
    questionSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
    replyError,
    replySuccess,
  ]);
  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
      questionId: questionId,
    });
  };
  const handleReviewSubmit = () => {
    if (review.length == 0) {
      toast.error("Review Can`t be Empty!");
    } else {
      addReviewInCourse({ rating, review, courseId: id });
    }
  };
  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can`t be empty!");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };
  return (
    <div className="w-[95%] 800px:w-[86%] py-4 m-auto">
      {/* Video Player */}
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo].videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } !w-[unset] text-white  !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="ml-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">
        {data[activeVideo].title}
      </h1>
      <br />
      {/* Tab Navigation */}
      <div
        className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] 
          rounded shadow-inner
          "
      >
        {["Overview", "Resources", "Q&A", "Reviews"].map(
          (item: string, index: number) => (
            <h5
              key={index}
              className={`800px:text-[20px] cursor-pointer ${
                activeBar === index
                  ? "text-red-500"
                  : "dark:text-white text-black"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {item}
            </h5>
          )
        )}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line break-words mb-3 dark:text-white text-black">
          {data[activeVideo]?.description}
        </p>
      )}
      {/* Resources Links */}
      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                href={item.url}
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}
      {/* Question Reply! */}
      {activeBar === 2 && (
        <>
          <div className="w-full flex">
            <Image
              src={`${
                user.avatar
                  ? user.avatar.url
                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
              }`}
              alt=""
              height={50}
              width={50}
              className="w-[50x] h-[50px] rounded-full"
            />
            <textarea
              name=""
              id=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="outline-none bg-transparent ml-3 border dark:text-white text-black border-[#0000001d] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
              cols={4}
              rows={20}
              placeholder="Write Your Question..."
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && `cursor-not-allowed`
              }
              
              `}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          {/* Horizontel Line */}
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          {/* Question Reply  */}
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}
      {/* Review Submission  */}
      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewsExist && (
              <>
                <div className="w-full flex">
                  <Image
                    src={`${
                      user.avatar
                        ? user.avatar.url
                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                    }`}
                    alt=""
                    height={50}
                    width={50}
                    className="w-[50x] h-[50px] rounded-full"
                  />
                  <div className="w-full ">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={20}
                      rows={5}
                      placeholder="Write your comment..."
                      className="outline-none bg-transparent 800px:ml-3 dark:text-white text-black border border-[#00000027] dark:border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                    ></textarea>
                  </div>
                </div>

                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            {/* Reviews */}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
            <div className="w-full">
              {course?.reviews &&
                [...course.reviews]
                  .reverse()
                  .map((item: any, index: number) => (
                    <div
                      className="w-full my-5 dark:text-white text-black"
                      key={index}
                    >
                      <div className="w-full flex ">
                        <div>
                          <Image
                            src={
                              item.user.avatar
                                ? item.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-2 ">
                          <h1 className="text-[18px]">{item?.user.name}</h1>
                          <Ratings rating={item.rating} />
                          <p>{item.comment}</p>
                          <small className="text-[#0000009e] dark:text-[#ffffff83]   ">
                            {format(item.createdAt)} •
                          </small>
                        </div>
                      </div>
                      {user.role === "admin" &&
                        item.commentReplies.length === 0 && (
                          <span
                            className={`${styles.label} !ml-10 cursor-pointer`}
                            onClick={() => {
                              setIsReviewReply(true);
                              setReviewId(item._id);
                            }}
                          >
                            AddReply
                          </span>
                        )}
                      {/* Review Reply */}
                      {isReviewReply && reviewId === item._id && (
                        <div className="w-full flex relative">
                          <input
                            type="text"
                            placeholder="Enter your reply..."
                            value={reply}
                            onChange={(e: any) => setReply(e.target.value)}
                            className="block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#000] dark:border-[#fff] p-[5px] w-[95%]"
                          />
                          <button
                            type="submit"
                            className="absolute right-0 bottom-1"
                            onClick={handleReviewReplySubmit}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      {/* Comment Replies */}
                      {item.commentReplies.map((i: any, index: number) => (
                        <div
                          className="w-full flex 800px:ml-16 my-5"
                          key={index}
                        >
                          <div className="w-[50px] h-[50px]">
                            <Image
                              src={
                                i.user.avatar
                                  ? i.user.avatar.url
                                  : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="w-[50px] h-[50px] rounded-full object-cover"
                            />
                          </div>
                          <div className="pl-2">
                            <div className="flex items-center">
                              <h5 className="text-[20px]">{i.user.name}</h5>
                              <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                            </div>
                            <p>{i.comment}</p>
                            <small className="text-[#ffffff83]">
                              {format(i.createdAt)} •
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default CourseContentMedia;

//Comment Reply
const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  questionId,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            questionId={questionId}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  item,
  activeVideo,
  index,
  answer,
  setAnswer,
  questionId,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <div className="my-4">
      <div className="flex mb-2 ">
        <div>
          <Image
            src={
              item.user.avatar
                ? item.user?.avatar.url
                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
            }
            alt=""
            width={50}
            height={50}
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        </div>
        <div className="pl-3 dark:text-[#fff] text-black">
          <h5 className="text-[20px]">{item?.user?.name}</h5>
          <p>{item?.question}</p>
          <small className=" text-[#000000b8] dark:text-[#ffffff83]">
            {!item.createdAt ? "" : format(item?.createdAt)}•
          </small>
        </div>
      </div>
      <div className="w-full flex ">
        <span
          className="800px:pl-16 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
          onClick={() => {
            setReplyActive(!replyActive);
            setQuestionId(item._id);
          }}
        >
          {!replyActive
            ? item.questionReplies.length !== 0
              ? "All Replies"
              : "Add Reply"
            : "Hide Replies"}
        </span>
        <BiMessage
          size={20}
          className="dark:text-[#ffffff83] cursor-pointer text-[#000000b8]"
        />
        <span className="pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]">
          {item.questionReplies.length}
        </span>
      </div>
      {replyActive && questionId === item._id && (
        <>
          {item?.questionReplies?.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full flex 800px:ml-16 my-5 text-black dark:text-white"
            >
              <div>
                <Image
                  src={
                    item.user.avatar
                      ? item.user?.avatar.url
                      : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                  }
                  alt=""
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
              </div>
              <div className="pl-2 ">
                <div className="flex items-center">
                  <h5 className="text-[20px]">{item.user.name}</h5>
                  {item.user.role === "admin" && (
                    <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                  )}
                </div>

                <p>{item.answer}</p>
                <small className="text-[#ffffff83] ">
                  {format(item.createdAt)} •
                </small>
              </div>
            </div>
          ))}
          <>
            <div className="w-full flex relative dark:text-white text-black">
              <input
                type="text"
                placeholder="Enter your answer..."
                value={answer}
                onChange={(e: any) => setAnswer(e.target.value)}
                className={`block 800px:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%] 
            ${answer === "" || (answerCreationLoading && "cursor-not-allowed")}
            `}
              />
              <button
                type="submit"
                className="absolute right-0 bottom-1"
                onClick={handleAnswerSubmit}
                disabled={answer === "" || answerCreationLoading}
              >
                Submit
              </button>
            </div>
            <br />
          </>
        </>
      )}
    </div>
  );
};
