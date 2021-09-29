import Chats from "../models/Chat";
import { fetchUsers } from "../shared/functions";
import { CustomRequest, IChatSchema, ICreateRoomBody } from "../types/global";
import { Response, Request, RequestHandler } from "express";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongoose";
const saveChat = () => {};

export const createChat: RequestHandler = async (
  req: CustomRequest<ICreateRoomBody>,
  res: Response,
  next
) => {
  let users = await fetchUsers(req.body.participants);
  if (users && users.length > (req.body.isGroup ? 0 : 1)) {
    let userIds = users.map((ele: any) => ele._id);
    if (!req.body.isGroup) {
      if (await checkChatExists(userIds)) {
        res.status(409).json({ error: "Private chat already exists" });
        return next();
      }
    }
    try {
      let roomID = uuid();
      let chat: IChatSchema = await new Chats({
        participants: userIds,
        roomID: roomID,
        messages: [],
        isGroup: req.body.isGroup,
      }).save();
      res.status(201).json({ roomID: chat.roomID });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: "Something went wrong while creating a chat.",
      });
      return next();
    }
  } else {
    res.status(404).json({
      error: "Users not found",
    });
    return next();
  }
};

export const checkChatExists = async (userIds: Array<ObjectId>) => {
  //TODO: Think about this query
  let chat = await Chats.find({
    participants: { $all: userIds },
    isGroup: false,
  });
  if (chat.length === 0) {
    return false;
  } else {
    return true;
  }
};
export const fetchRoom = async (roomID: string) => {
  let chat = await Chats.findOne({ roomID: roomID }).exec();
  if (chat) {
    return true;
  } else {
    return false;
  }
};

export const fetchChats = async (req: Request, res: Response) => {
  try {
    if (typeof req.query["roomID"] === "string") {
      let chat = await Chats.findOne({ roomID: req.query["roomID"] })
        .populate("messages")
        .sort("-date");
      res.status(200).json({ chat: chat });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching chats" });
  }
};
