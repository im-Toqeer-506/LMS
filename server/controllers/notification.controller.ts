import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import NotificationModel from "../models/notification.model";
//get all Motifications ---only for admin
export const getNotifications = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//update notifications status ---admin only
export const updateNotificationStatus = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notification = await NotificationModel.findById(req.params.id);
      if (!notification) {
        return next(new ErrorHandler("Notification not found", 400));
      } else {
        notification.status
          ? (notification.status = "read")
          : notification?.status;
      }
      await notification.save();
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(201).json({
        success: true,
        notifications,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
