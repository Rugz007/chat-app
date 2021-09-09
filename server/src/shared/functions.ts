import Users from "../models/User";
import logger from "./Logger";

export const pErr = (err: Error) => {
  if (err) {
    logger.err(err);
  }
};

export const getRandomInt = () => {
  return Math.floor(Math.random() * 1_000_000_000_000);
};

export const checkUsers = async () => {
  var user1 = await Users.findOne({ username: "test" });
  var user2 = await Users.findOne({ username: "test1" });
  if (!user1 && !user2) {
    user1 = await new Users({ username: "test" }).save();
    user2 = await new Users({ username: "test1" }).save();
    //return false
  }
  return true;
};

export const fetchUsers = async (usernames: Array<string>) => {
  console.log(usernames)
  var users = await Users.find({ username: { $in: usernames } });
  console.log("Users" + users);
  if (users.length !== 0) {
    return users;
  }
  return null;
};
