import { IMessage } from "../types/global";
import { Schema,model } from "mongoose";
const MessageSchema = new Schema<IMessage>(
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
module.exports = model("MessageSchema", MessageSchema);