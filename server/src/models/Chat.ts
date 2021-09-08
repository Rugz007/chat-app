import { Schema, model, ObjectId } from "mongoose";

const ChatSchema = new Schema(
  {
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "MessageSchema",
      },
    ],
    participants: [
      {
        type:Schema.Types.ObjectId,
        ref: "UserSchema"
      }
    ]
  },
  {
    timestamps: true,
  }
);
module.exports = model("ChatSchema", ChatSchema);
