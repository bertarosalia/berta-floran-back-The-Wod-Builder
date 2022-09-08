import express from "express";
import registerUser from "../../controllers/UsersControllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

export default registerUser;
