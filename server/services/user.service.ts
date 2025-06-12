import { Response } from "express";
import { redis } from "../utils/redis";
import userModel from "../models/user.model";
export const getUserById = async (id: string, res: Response) => {
  const userJson = await redis.get(id);
  if(userJson){
    const user=JSON.parse(userJson);
    res.status(201).json({
    success: true,
    user,
  });
  }
};
//get all users
export const getAllUsersService = async (res: Response) => {
    const users = await userModel.find().sort({ createdAt: -1 });
    res.status(201).json({
        success: true,
        users,
    })
};
//update user role service
export const  updateUserRoleService=async (res: Response, id: string, role: string) =>{
  const user = await userModel.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );
  res.status(200).json({
    success: true,
    message: "User role updated successfully",
    user,
  });
}
