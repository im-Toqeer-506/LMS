require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { catchAsyncErrors } from "./catchAsyncErrors";
//Authenticated User....
export const isAuthenticated = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies?.access_token as string;
    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource", 400)
      );
    }
    const decode = jwt.verify(
      access_token,
      process.env.ACCESS_TOKEN as string
    ) as JwtPayload;
    if (!decode) {
      return next(new ErrorHandler("Access token is not valid!", 400));
    }
    const user = await redis.get(decode.id);
    if (!user) {
      return next(new ErrorHandler("Please login to access this resourse", 400));
    }
    req.user = JSON.parse(user);
    next();
  }
);
//validate user role
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || ""))
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resourse`,
          403
        ) 
      );
      next();
  };
};
