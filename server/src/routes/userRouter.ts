import { Router } from "express";
import { Login } from "../controller/userController";
var bodyParser = require("body-parser");

var userRouter = Router();
userRouter.use(bodyParser.json());
userRouter.post("/login", Login);
export default userRouter