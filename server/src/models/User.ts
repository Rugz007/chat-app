import { Schema,model } from "mongoose";
import { IUserSchema } from "../types/global";

const UserSchema = new Schema<IUserSchema>(
  {
    username: {
      type: String,
      required: true,
      unique:true,
    },
  },
  {
    timestamps: true,
  }
);
const Users = model("UserSchema", UserSchema);
export default Users;