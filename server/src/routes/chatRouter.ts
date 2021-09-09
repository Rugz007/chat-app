import { createChat } from "../controller/chatController";
import { Router } from "express";
var bodyParser = require("body-parser");

var chatRouter = Router();
chatRouter.use(bodyParser.json());
chatRouter.post("/create", createChat);
export default chatRouter