import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { editCourse, getAllCourses, getSingleCourse, uploadCourse } from "../controllers/course.controllere";
const CourseRouter = express.Router();
CourseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
CourseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
CourseRouter.get(
  "/get-course/:id",
  getSingleCourse,
);
CourseRouter.get(
  "/get-all-course",
  getAllCourses,
);
export default CourseRouter;