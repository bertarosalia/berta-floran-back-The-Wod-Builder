import { Joi } from "express-validation";

const minLength = 5;

const registerValidation = {
  body: Joi.object({
    name: Joi.string().min(minLength).required(),
    password: Joi.string().min(minLength).required(),
    repeat_password: Joi.ref("password"),
    email: Joi.string().email().required(),
  }),
};

export default registerValidation;
