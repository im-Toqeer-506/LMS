import { Response } from "express";
import CourseModel from "../models/course.model";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
//create course
export const createCourse = catchAsyncErrors(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
