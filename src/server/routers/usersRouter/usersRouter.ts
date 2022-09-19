import express from "express";
import { validate } from "express-validation";
import userRegister from "../../controllers/UsersControllers/usersController";
import registerValidation from "../../schemas/usersCredentialsSchema";

const userRouter = express.Router();

userRouter.post("/register", validate(registerValidation), userRegister);

export default userRegister;
