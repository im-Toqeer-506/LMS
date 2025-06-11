import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

//Upload Courses
export const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail = {
        publicId: myCloud.public_id,
        url: myCloud.secure_url,
      };
      createCourse(data, res, next);
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// Edit Course
export const editCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const courseId = req.params.id;
      const courseData = (await CourseModel.findById(courseId)) as any;
      if (thumbnail && !thumbnail.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      if (thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );
      if (redis) {
        await redis.del(`course:${courseId}`);
        await redis.del("allCourses");
      }
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//get single course ---without purchasing
export const getSingleCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCacheExits = await redis.get(courseId);
      if (isCacheExits) {
        const course = JSON.parse(isCacheExits);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set(courseId, JSON.stringify(course), "EX", 604800);
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//get all courses
export const getAllCourses = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExits = await redis.get("allCourses");
      if (isCacheExits) {
        const course = JSON.parse(isCacheExits);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set("allCourses", JSON.stringify(courses));
        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//get course Content ---only for valid users
export const getCourseByUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;
      const courseExist = userCourseList?.find(
        (course: any) => course._id.toString() === courseId.toString()
      );
      if (!courseExist) {
        return next(
          new ErrorHandler("You are not eligible to access this course.", 404)
        );
      }
      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;
      res.status(200).json({
        success: true,
        content,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//add question in course
interface IAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestionToCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id.", 400));
      }
      const courseContent = course?.courseData.find((content: any) =>
        content._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Content not found.", 404));
      }
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      courseContent.questions.push(newQuestion);
      course?.save();
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//add answer to question
interface IAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}
export const addAnswer = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        answer,
        courseId,
        contentId,
        questionId,
      }: IAddAnswerData = req.body;
      const course = await CourseModel.findById(courseId);
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id.", 400));
      }
      const courseContent = course?.courseData.find((content: any) =>
        content._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Content not found.", 404));
      }
      const question = courseContent.questions.find((q: any) =>
        q._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler("Invalid question Id.", 401));
      }
      //create an answer object
      const newAnswer: any = {
        user: req.user,
        answer,
      };
      question?.questionReplies?.push(newAnswer);
      await course?.save();
      if (req.user?._id === question.user?._id) {
        //create a notification
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };
        const html = ejs.renderFile(
          path.join(__dirname, "../mails/questionReply.ejs"),
          data
        );
        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "questionReply.ejs",
            data,
          });
        } catch (error:any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
      res.status(200).json({
        success: true,
        course: course,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add review in the course
interface IAddReviewData {
    courseId: string;
    review: string;
    rating: number;
    userId: string;
}
export const addReview=catchAsyncErrors(async (req: Request, res: Response, next: NextFunction)=>{
try {
   const userCourseList = req.user?.courses;
   const courseId=req.params.id;
   //check if the course id exist in then UserCourseList based on the _id
    const courseExists = userCourseList?.find(
      (course: any) => course?._id?.toString() === courseId
    );

  if(!courseExists){
    return next(new ErrorHandler("You are not eligible for this course", 403));
  }
  const course=await CourseModel.findById(courseId);
  const { review, rating } = req.body as IAddReviewData;
  const ReviewData: any = {
  user: req.user,
  comment: review,
  rating: rating,
  };
  course?.reviews.push(ReviewData);
  let avg=0;
  course?.reviews.forEach((rev:any)=>{
    avg+=rev.rating;
  })
  if(course){
    course.ratings=avg/course.reviews.length;
  }
  await course?.save();
  const notification={
        user: req.user?._id,
        title: "New Review Received",
        message: `${req.user?.name} has given a new review for ${course?.name}`,
  }
  res.status(200).json({
        success: true,
        course,
  })
}  catch (error:any) {
  return next(new ErrorHandler(error.message, 500));
}
});
//add reply in review
interface IAddReviewReplyData {
    comment: string;
    courseId: string;
    reviewId: string;
}
export const addReplyToReview=catchAsyncErrors(async (req: Request, res: Response, next: NextFunction)=>{
  try {
    const { comment, courseId, reviewId } = req.body as IAddReviewReplyData;
    const course = await CourseModel.findById(courseId);
    if (!courseId) {
      return next(new ErrorHandler("Course not found.", 404));
    }
    const review = course?.reviews.find(
    (rev: any) => rev._id.toString() === reviewId
    );
    if (!review) {
      return next(new ErrorHandler("Review not found", 400));
    }
    const replyData:any={
      user:req.user,
      comment,
    }
    course?.reviews.push(replyData);
    course?.save();
    res.status(201).json({
      success:true,
      course
    })
  } catch (error:any) {
    return next(new ErrorHandler(error.message, 500));
    }
})