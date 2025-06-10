import { NextFunction, Request, Response } from "express";
import cloudinary from "cloudinary";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { createCourse } from "../services/course.service";

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
