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
    const exerciseDelete = await Exercise.findByIdAndDelete({ id });

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
export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const exerciseFound = await Exercise.findById({ id });
    res.status(200).json({ exerciseFound });
  } catch {
    const newError = new CustomError(
      404,
      "Element not found",
      "Cannot response to this request"
    );
    next(newError);
  }
};

export const createExercise = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newExercise = req.body;

  try {
    const newExerciseCreated = await Exercise.create(newExercise);
    res.status(200).json({ newExerciseCreated });
  } catch (error) {
    const customError = new CustomError(
      400,
      "Error creating new exercise",
      "Cannot create an exercise"
    );

    next(customError);
  }
};
