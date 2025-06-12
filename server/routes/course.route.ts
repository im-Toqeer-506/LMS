import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  addAnswer,
  addQuestionToCourse,
  addReplyToReview,
  addReview,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
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
CourseRouter.get("/get-course/:id", getSingleCourse);
CourseRouter.get("/get-all-course", getAllCourses);
CourseRouter.get("/get-course-content/:id", isAuthenticated, getCourseByUser);
CourseRouter.put("/add-question", isAuthenticated, addQuestionToCourse);
CourseRouter.put("/add-answer", isAuthenticated, addAnswer);
CourseRouter.put("/add-review/:id", isAuthenticated, addReview);
CourseRouter.put(
  "/add-reply",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);
CourseRouter.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCoursesAdmin
);
export default CourseRouter;
