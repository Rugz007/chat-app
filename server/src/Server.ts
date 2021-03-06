import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import "express-async-errors";
import baseRouter from "./routes";
import chatRouter from "./routes/chatRouter";
import logger from "./shared/Logger";
import userRouter from "./routes/userRouter";
var cors = require("cors");
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://database:27017/mongo", {
  useNewUrlParser: true,
});
connect.then(
  (db: any) => {
    console.log("Connected correctly to database server");
  },
  (err: any) => {
    console.log(err);
  }
);
const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

// Add APIs
app.use("/api", baseRouter);
app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

app.get("*", (req: Request, res: Response) => {
  res.json({ Message: "Hello World" });
});

const http = require("http");
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: "*",
  },
});

require("./sockets/chatSocket").connectUser(io);

// Export express instance
module.exports = { app: app, server: server, io: io };
