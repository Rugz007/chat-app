import { Schema, model } from "mongoose";
import { IChatSchema } from "../types/global";

const ChatSchema = new Schema<IChatSchema>(
  {
    roomID: {
      type: String,
      unique: true,
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "MessageSchema",
      },
    ],
    participants: [
      {
        type: String,
      },
    ],
    isGroup:
    {
      type:Boolean,
      required:true,
    }
  },
  {
    timestamps: true,
  }
);
const Chats = model("ChatSchema", ChatSchema);
export default Chats;
