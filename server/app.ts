require('dotenv').config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {ErrorMiddleware} from "./middleware/error";
import UserRouter from "./routes/user.route";
import CourseRouter from "./routes/course.route";
export const app = express();
//body parser
app.use(express.json({ limit: "50mb" }));
//cookie parser
app.use(cookieParser());

// cors -> cross origin resource sharing
app.use(cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
    credentials: true
}));
// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working!"
    })
})
//api routes
app.use('/api/v1',UserRouter)
app.use('/api/v1',CourseRouter)

// unknown routes
app.all(/(.*)/, (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found!`) as any;
    err.statusCode = 404;
    next(err);
})
app.use(ErrorMiddleware);
