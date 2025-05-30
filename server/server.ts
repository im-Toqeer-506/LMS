import { app } from "./app";
import dbConnection from "./utils/db";
require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log(`Server is connected on the PORT:${process.env.PORT}`);
  dbConnection();
});
