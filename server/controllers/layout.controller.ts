import { NextFunction, Request, Response } from "express";
import { catchAsyncErrors } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import LayoutModel from "../models/layout.model";
import cloudinary from "cloudinary";

export const createLayout = catchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      const isTypeExist=await LayoutModel.findOne({type});

         if(isTypeExist){
            return next(new ErrorHandler(`${type} already exists`, 400));
        }     
      if (type == "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "Banner",
        });
        const banner = {
          type: "Banner",
          banner: {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
            title,
            subTitle,
          },
        };

        await LayoutModel.create(banner);


      }
      if(type==='FAQ'){
        const {faq}=req.body;
        // Validate faq structure
        const faqItems=await Promise.all(faq.map(async(item:any)=>{
            return {
                question: item.question,
                answer: item.answer
            }
        }))
        await LayoutModel.create({type:'FAQ',faq:faqItems});
      }
      if(type==='Categories'){
        const {categories}=req.body;
        const categoriesItems=await Promise.all(categories.map(async(item:any)=>{
            return {
            title:item.title
            }
        }))
        await LayoutModel.create({type:'Categories',categories:categoriesItems});
      }
      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      })
    } 
    catch (error:any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
