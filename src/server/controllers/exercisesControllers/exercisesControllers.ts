import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Exercise from "../../../database/models/Exercise";
import CustomError from "../../../utils/CustomError";

const debug = Debug("the-wod-builder:database:index");

export const getExercises = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let exercises;

  try {
    exercises = await Exercise.find();
    res.status(200).json({ exercises });
  } catch (error) {
    const errorExercise = new CustomError(
      404,
      "No exercises in database",
      "Exercises not found"
    );
    next(errorExercise);
  }
};

export const deleteExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  debug("Trying to delete exercise");

  try {
    const exerciseDelete = await Exercise.findByIdAndDelete(id);

    if (exerciseDelete) {
      res.status(200).json({ message: "Successfully deleted exercise" });
    } else {
      res.status(404).send();
    }
  } catch (error) {
    const newError = new CustomError(
      404,
      "No exercises found",
      "Error deleting exercise"
    );
    next(newError);
  }
};
