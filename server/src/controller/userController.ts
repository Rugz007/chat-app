import { RequestHandler, Response } from "express";
import Users from "../models/User";
import { CustomRequest, ILogin } from "../types/global";

export const Login: RequestHandler = async (
  req: CustomRequest<ILogin>,
  res: Response,
  next
) => {
  var user = await Users.findOne({ username: req.body.username });
  if (!user) {
    user = await Users.create({ username: req.body.username });
    console.log(user)
    res.status(200).json(user);
  }
  res.status(200).json(user);
};
