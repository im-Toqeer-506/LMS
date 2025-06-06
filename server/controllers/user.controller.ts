require("dotenv").config();
import { Request, Response, NextFunction } from "express";
import userModel, { IUser } from "../models/user.model";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import ejs from "ejs";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import path from "path";
import sendMail from "../utils/sendMail";
import { accessTokenOptions, sendToken } from "../utils/jwt";
import { redis } from "../utils/redis";
//register
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}
export const registerationUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, avatar } = req.body;
      const isEmailExist = await userModel.findOne({ email });
      if (isEmailExist) {
        return next(new ErrorHandler("Email Already Exost!", 400));
      }
      const user: IRegistrationBody = {
        name,
        email,
        password,
      };
      const activationtoken = createActivationToken(user);

      const activationCode = activationtoken.activationCode;
      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `Please check your emial ${user.email} to activate your account`,
          activationtoken: activationtoken.token,
        });
      } catch (error:any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error:any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
interface IActivationToken {
  token: String;
  activationtoken: String;
}
export const createActivationToken = (user: any) => {
  const activationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

//activate User
interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}
export const activateUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        activation_token,
        activation_code,
      } = req.body as IActivationRequest;

      const newUser: {
        user: IUser;
        activationCode: string;
      } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as Secret
      ) as any;
      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Invalid activation code", 400));
      }
      const { name, email, password } = newUser.user;
      const existUser = await userModel.findOne({ email });
      if (existUser) {
        return next(new ErrorHandler("Email already exists", 400));
      }
      const user = await userModel.create({
        name,
        email,
        password,
      });
      res.status(201).json({
        success: true,
        message: "User activated successfully",
      });
    } catch (error:any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
//login User
interface ILoginRequest {
  email: string;
  password: string;
}
export const LoginUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest; //the as keyword is a TypeScript type assertion.
      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }
      const user = await userModel.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 401));
      }
      sendToken(user, 200, res);
    } catch (error:any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);
// logout user
export const LogoutUser = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = req.user?._id || "";
      redis.del(userId);
      res.status(200).json({
        success: true,
        message: "User logged out successfully.",
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
//update access token
export const updateAccessToken = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;
      const decode = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;
      if (!decode) {
        return next(new ErrorHandler("Could not Refresh token", 400));
      }
      const session = await redis.get(decode.id as string);
      if (!session) {
        return next(
          new ErrorHandler("Session expired, please login again!", 401)
        );
      }
      const user = JSON.parse(session);
      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string
      );
      const refresh_Token = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string
      );
      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refresh_Token, accessTokenOptions);
      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error:any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
