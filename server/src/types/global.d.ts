import { ObjectId } from "mongoose";
import { Request } from "express";
export interface IUserSchema {
  username: string;
}
export interface IMessageSchema {
  sent_by: ObjectId;
  message: string;
}

export interface IChatSchema {
  roomID: string;
  messages: Array<IMessageSchema>;
  participants: Array<IUserSchema>;
  isGroup:boolean,
}

export interface IMessageBody {
  message: string;
  roomID: string;
}
export interface ICreateRoomBody {
  participants: Array<string>;
  isGroup:boolean,
}
export interface CustomRequest<T> extends Request {
  body: T;
}
export interface CustomResponse {
  status: number;
  data: any;
}
