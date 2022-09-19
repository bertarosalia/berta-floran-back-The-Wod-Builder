import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/User";
import UserRegister from "../../../types/userInterfaces";
import hashCreator from "../../../utils/auth/auth";
import CustomError from "../../../utils/CustomError/CustomError";

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData: UserRegister = req.body;

  userData.password = await hashCreator(userData.password);

  try {
    const newUser = await User.create(userData);
    res.status(201).json({ user: newUser });
  } catch (error) {
    const customError = new CustomError(
      400,
      error.message,
      "Error creating new user"
    );
    next(customError);
  }
};

export default userRegister;
