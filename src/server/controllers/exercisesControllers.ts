import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Exercise from "../../database/models/Exercise";
import CustomError from "../../utils/CustomError";

const debug = Debug("the-wod-builder:database:index");

export const getExercises = async (req: Request, res: Response) => {
  const exercises = await Exercise.find();

  res.status(200).json({ exercises });
};

export const deleteExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idExercise = req.params.id;
  debug("Trying to delete exercise");

  try {
    await Exercise.findByIdAndDelete(idExercise);
    res.status(200).json({ message: "Successfully deleted exercise" });

    debug("Received a request to delete an exercise");
  } catch (error) {
    const mongooseError = new CustomError(
      404,
      "No exercises found",
      "Error deleting exercise"
    );
    next(mongooseError);
  }
};
