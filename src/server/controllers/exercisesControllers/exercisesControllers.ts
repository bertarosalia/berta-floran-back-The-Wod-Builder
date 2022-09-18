import Debug from "debug";
import { NextFunction, Request, Response } from "express";
import Exercise from "../../../database/models/Exercise";
import CustomError from "../../../utils/CustomError";

const debug = Debug("the-wod-builder:database:index");

export const getAllExercises = async (
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
  const { deleteId: exerciseId } = req.params;
  debug("Trying to delete exercise");

  try {
    await Exercise.findByIdAndDelete({ _id: exerciseId });
  } catch (error) {
    const newError = new CustomError(
      404,
      "No exercises found",
      "Error deleting exercise"
    );
    next(newError);
    return;
  }
  res.status(200).json({ message: "Successfully deleted exercise" });
};
export const getOneExerciseById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { exerciseId } = req.params;
    const exerciseFound = await Exercise.findById({ _id: exerciseId });
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
