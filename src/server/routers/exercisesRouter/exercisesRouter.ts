import express from "express";
import {
  getAllExercises,
  deleteExercise,
  createExercise,
  getOneExerciseById,
  updateExercise,
} from "../../controllers/exercisesControllers/exercisesControllers";

const exercisesRouter = express.Router();

exercisesRouter.get("/", getAllExercises);
exercisesRouter.delete("/:exerciseId", deleteExercise);
exercisesRouter.post("/create", createExercise);
exercisesRouter.get("/:exerciseId", getOneExerciseById);
exercisesRouter.put("/:exerciseId", updateExercise);

export default exercisesRouter;
