import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/authRoute.js";
import userRoute from "./Routes/userRoute.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 6050;
const app = express();

dotenv.config();

let server;
app.use(express.json());
app.use(cookieParser());
const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_Connection_String);
    console.log("Connected to Mongodb");
  } catch (err) {
    console.log("Failed to connect to mongoDb", err.message);
    process.exit(1);
  }
};

app.use("/auth", authRoute);
app.use("/user", userRoute);

const startServer = async () => {
  await connectToMongo();

  server = app.listen(port, () => {
    console.log("Port running on:", port);
  });
};

const gracefullyShutdown = async () => {
  console.log("Shutting down gracefully...");
  server.close((err) => {
    if (err) {
      console.error("Error closing HTTP server:", err);
      return;
    }
    console.log("HTTP server closed...");
    process.exit(0);
  });
};

process.on("SIGINT", gracefullyShutdown);
process.on("SIGTERM", gracefullyShutdown);

startServer();
