import express from "express";
import {
  activateUser,
  LoginUser,
  LogoutUser,
  registerationUser,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
const UserRouter = express.Router();
UserRouter.post("/registration", registerationUser);
UserRouter.post("/activate-user", activateUser);
UserRouter.post('/login',LoginUser)
UserRouter.get('/logout',isAuthenticated,authorizeRoles('Admin'),LogoutUser)

export default UserRouter;
