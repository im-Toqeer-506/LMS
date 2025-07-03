import express from "express";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  LoginUser,
  LogoutUser,
  registerationUser,
  socialAuth,
  updateAccessToken,
  updateUserInfo,
  updateUserPassword,
  updateUserProfilePicture,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const UserRouter = express.Router();
UserRouter.post("/registration", registerationUser);
UserRouter.post("/activate-user", activateUser);
UserRouter.post("/login", LoginUser);
UserRouter.get("/logout", isAuthenticated, LogoutUser);
UserRouter.get("/refresh-token", updateAccessToken);
UserRouter.get("/me", isAuthenticated, getUserInfo);
UserRouter.post("/social-auth", socialAuth);
UserRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
UserRouter.put("/update-user-password", isAuthenticated, updateUserPassword);
UserRouter.put(
  "/update-user-avatar",
  isAuthenticated,
  updateUserProfilePicture
);
UserRouter.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
UserRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
UserRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);
export default UserRouter;
