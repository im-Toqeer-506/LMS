import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { generate12MonthsData } from "../utils/analytics.genrator";
import userModel from "../models/user.model";
import OrderModel from "../models/order.model";
import CourseModel from "../models/course.model";
//get user analytics ---only admins
export const getUserAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    const users=await generate12MonthsData(userModel);
    res.status(200).json({
    success: true,
    users,
    });
    } catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
    }
});
// get course analytics ---only admins
export const getCourseAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    const courses=await generate12MonthsData(CourseModel);
    res.status(200).json({
    success: true,
    courses,
    });
    } catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
    }
});
// get order analytics ---only admins
export const getOrderAnalytics = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    const orders=await generate12MonthsData(OrderModel);
    res.status(200).json({
    success: true,
    orders,
    });
    } catch (error:any) {
    return next(new ErrorHandler(error.message, 400));
    }
});