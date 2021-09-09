import { IMessageSchema } from "../types/global";
import { Schema, model } from "mongoose";
const MessageSchema = new Schema<IMessageSchema>(
  {
    sent_by: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "UserSchema",
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Messages = model("MessageSchema", MessageSchema);
export default Messages;
