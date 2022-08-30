import { model, Schema } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
