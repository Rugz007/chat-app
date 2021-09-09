import { IMessageBody } from "../types/global";
import { fetchRoom } from "../controller/chatController";
import { Socket } from "socket.io";
import Chats from "../models/Chat";
export const connectUser = (io: any) => {
  io.on("connection", async (socket: Socket) => {
    console.log("Client Connected");
    let chats = await Chats.find().select('roomID -_id')
    chats = chats.map((ele : any) => ele.roomID)
    socket.join(chats)
    socket.on("send message", async (body: IMessageBody) => {
      const roomChecked = await fetchRoom(body.roomID);
      console.log(roomChecked);
      if (roomChecked) {
        socket.broadcast.to(body.roomID).emit("message", body.message);
      }
    });
  });
};
