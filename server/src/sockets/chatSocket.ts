import { IMessageBody } from "../types/global";
import { fetchRoom } from "../controller/chatController";
import { Socket } from "socket.io";
import Chats from "../models/Chat";
import Message from "../models/Message";
var mongoose = require('mongoose');
export const connectUser = (io: any) => {
  io.on("connection", async (socket: Socket) => {
    console.log("Client Connected");
    let chats = await Chats.find().select("roomID -_id");
    chats = chats.map((ele: any) => ele.roomID);
    socket.join(chats);
    socket.on("send message", async (body: IMessageBody) => {
      const roomChecked = await fetchRoom(body.roomID);
      if (roomChecked) {
        socket.broadcast.to(body.roomID).emit("message", body.message);
        var message = await new Message({
          sent_by: mongoose.Types.ObjectId(body.userID),
          message: body.message,
        }).save();
        await Chats.updateOne(
          { roomID: body.roomID },
          { $push: { messages: message } }
        );
      }
    });
  });
};
