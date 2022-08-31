import { Request, Response } from "express";
import Exercise from "../../database/models/Exercise";

const getExercises = async (req: Request, res: Response) => {
  const exercises = await Exercise.find();

  res.status(200).json({ exercises });
};

export default getExercises;
