import { app } from "./app";
import { initSocketServer } from "./SocketServer";
import dbConnection from "./utils/db";
import { v2 as cloudinary } from "cloudinary";
import http from "http";
require("dotenv").config();
//recall:Socket ->Runs on top of the HTTP(S) server
const server=http.createServer(app);
//cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//connection for socket
initSocketServer(server);
server.listen(process.env.PORT, () => {
  console.log(`Server is connected on the PORT:${process.env.PORT}`);
  dbConnection();
});
