import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";

//Upload Courses
export const uploadCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;
      const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
        folder: "courses",
      });
      data.thumbnail={
        publicId:myCloud.public_id,
        url:myCloud.secure_url

      }
      createCourse(data,res,next);
      

    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
// Edit Course
export const editCourse=catchAsyncErrors(async(req: Request, res: Response, next: NextFunction)=>{
  try {
    const data=req.body;
    const thumbnail=data.thumbnail;
    const courseId = req.params.id;
    const courseData = (await CourseModel.findById(courseId)) as any;
    if(thumbnail&&!thumbnail.startsWith("https")){
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
      success:true,
      course
    })
  } catch (error:any) {
    return next(new ErrorHandler(error.message,500))
  }
});
//get single course ---without purchasing
export const getSingleCourse = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseId=req.params.id;
    const isCacheExits = await redis.get(courseId);
    if(isCacheExits){
      const course = JSON.parse(isCacheExits);
      res.status(200).json({
      success: true,
      course,
      })
    }else{
    const course=await CourseModel.findById(req.params.id).select("-courseData.videoUrl       -courseData.suggestion -courseData.questions -courseData.links");
    await redis.set(courseId, JSON.stringify(course), "EX", 604800);
    res.status(200).json({
    success:true,
    course,
  })
  }
  } catch (error:any) {
    return next(new ErrorHandler(error.message,500))
  }
  } )
  //get all courses
  export const getAllCourses=catchAsyncErrors( async (req: Request, res: Response, next: NextFunction) =>{
    try {
    const isCacheExits = await redis.get("allCourses");
    if(isCacheExits){
      const course = JSON.parse(isCacheExits);
      res.status(200).json({
      success: true,
      course,
      })
    }else{
   const courses=await CourseModel.find().select("-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links");
    await redis.set("allCourses", JSON.stringify(courses));
    res.status(200).json({
    success:true,
    courses,
    });
    }
    } catch (error:any) {
    return next(new ErrorHandler(error.message,500))
  }
  })
  //get course Content ---only for valid users
  export const getCourseByUser=catchAsyncErrors(async(req: Request, res: Response, next: NextFunction)=>{
    try {
      const userCourseList=req.user?.courses;
      const courseId=req.params.id;
      const courseExist=userCourseList?.find((course:any)=>course._id.toString()===courseId.toString());
      if(!courseExist){
      return next(new ErrorHandler("You are not eligible to access this course.", 404));
      }
      const course=await CourseModel.findById(courseId);
      const content=course?.courseData;
      res.status(200).json({
        success:true,
        content
      })
    }catch (error:any) {
    return next(new ErrorHandler(error.message,500))
  }
  })