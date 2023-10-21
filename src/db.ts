import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function serverStart() {
  try {
    // await mongoose.connect(
    //   "mongodb://localhost:27017/folderTree" as string
    // );
    await mongoose.connect(config.database_url as string)
    console.log("Database Connected....😃");
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Failed To Connect Database..😥", error);
  }
}
serverStart();