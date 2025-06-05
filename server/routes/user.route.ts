import express from "express";
import {
  activateUser,
  LoginUser,
  LogoutUser,
  registerationUser,
} from "../controllers/user.controller";
const UserRouter = express.Router();
UserRouter.post("/registration", registerationUser);
UserRouter.post("/activate-user", activateUser);
UserRouter.post('/login',LoginUser)
UserRouter.get('/logout',LogoutUser)
export default UserRouter;
