import { ObjectId } from "mongoose";

export interface IUser {
  name: String,
  username: String,
}
export interface IMessage{
  sent_by: ObjectId,
  message: string
}