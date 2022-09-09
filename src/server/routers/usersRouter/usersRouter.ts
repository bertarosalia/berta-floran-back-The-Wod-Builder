import express from "express";
import { validate } from "express-validation";
import registerUser from "../../controllers/UsersControllers/usersController";
import registerValidation from "../../schemas/usersCredentialsSchema";

const usersRouter = express.Router();

usersRouter.post("/register", validate(registerValidation), registerUser);

export default registerUser;
