import express from "express";
import { registerationUser } from "../controllers/user.controller";
const UserRouter = express.Router();
UserRouter.post("/registration", registerationUser);
export default UserRouter;