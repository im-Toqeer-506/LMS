import express from "express";
import {
  activateUser,
  getUserInfo,
  LoginUser,
  LogoutUser,
  registerationUser,
  socialAuth,
  updateAccessToken,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const UserRouter = express.Router();
UserRouter.post("/registration", registerationUser);
UserRouter.post("/activate-user", activateUser);
UserRouter.post("/login", LoginUser);
UserRouter.get("/logout", isAuthenticated, LogoutUser);
UserRouter.get("/refresh-token", updateAccessToken);
UserRouter.get("/me", isAuthenticated, getUserInfo);
UserRouter.get("/social-auth", socialAuth);
UserRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
export default UserRouter;
