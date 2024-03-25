import mongoose from "mongoose";

const Connection = async (URL) => {
  try {
    //const URL = "mongodb+srv://prince001:1234@cluster0.e1vmpkj.mongodb.net/NEWSAPP";
    await mongoose.connect(URL, {
      useNewUrlParser: true, // Not needed, but can be kept for compatibility
      useUnifiedTopology: true, // Use the new option introduced in MongoDB Node.js driver version 4.0.0
    });

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error);
    process.exit(1);
  }
};

export default Connection;
