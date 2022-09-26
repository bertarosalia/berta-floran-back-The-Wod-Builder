import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: false,
  },
  email: {
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
