import { app } from "./app";
import dbConnection from "./utils/db";
import { v2 as cloudinary } from "cloudinary";

require("dotenv").config();
//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(process.env.PORT, () => {
  console.log(`Server is connected on the PORT:${process.env.PORT}`);
  dbConnection();
});
