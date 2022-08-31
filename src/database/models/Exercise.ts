import { model, Schema } from "mongoose";

const exerciseSchema = new Schema({
  body: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  description: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
});

const Exercise = model("Exercise", exerciseSchema, "exercises");

export default Exercise;
