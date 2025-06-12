import express from "express";
const notificationRouter = express.Router();
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotificationStatus,
} from "../controllers/notification.controller";
notificationRouter.get(
  "/get-all-notifications",
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);
notificationRouter.put(
  "/update-notification/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotificationStatus
);
export default notificationRouter;
