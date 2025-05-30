import mongoose, { set } from "mongoose";
require("dotenv").config();
const dbURl: String = process.env.MONOGODB_URI || "";
const dbConnection = async () => {
  try {
    await mongoose.connect(`${dbURl}`).then((data: any) => {
      console.log(`MongoDB connected successfully: ${data.connection.host}`);
    });
  } catch (error) {
    console.error("Error", error);
    setTimeout(dbConnection, 5000);
  }
};
export default dbConnection;