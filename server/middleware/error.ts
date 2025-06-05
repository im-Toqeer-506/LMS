import ErrorHandler from "../utils/ErrorHandler";
import { NextFunction, Request, Response } from "express";
export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error!";
  //wrong mongoDB id error
  if (err.name === "CastError") {
    const message = `Resources not Found with this id .. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  //Duplicate key Error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 409);
  }
  //wrong jwt error
  if (err.name === "JsonWebTokenError") {
    const message = `Your Url is invalid!,Please try again Later `;
    err = new ErrorHandler(message, 401);
  }
  //jwt token expired
  if (err.name === "TokenExpiredError") {
    const message = `Your Url is Expired!\nPlease try again Later `;
    err = new ErrorHandler(message, 401);
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
