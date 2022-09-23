import express from "express";
import { validate } from "express-validation";
import {
  userLogin,
  userRegister,
} from "../../controllers/UsersControllers/usersController";
import registerValidation from "../../schemas/usersCredentialsSchema";

const userRouter = express.Router();

userRouter.post("/register", validate(registerValidation), userRegister);
userRouter.post("/login", userLogin);

export default userRegister;
