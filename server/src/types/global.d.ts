import { ObjectId } from "mongoose";
import { Request } from "express";
declare module "http" {
  interface IncomingHttpHeaders {
    roomID?: string;
  }
}
export interface CustomRequest<T> extends Request {
  body: T;
}
export interface CustomResponse {
  status: number;
  data: any;
}
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
  participants: Array<string>;
  isGroup: boolean;
}

export interface IMessageBody {
  message: string;
  userID: string;
  roomID: string;
}
export interface IJoinRoomBody {
  userID: string;
}
export interface ICreateRoomBody {
  participants: Array<string>;
  isGroup: boolean;
}
export interface ILogin {
  username: string;
}
