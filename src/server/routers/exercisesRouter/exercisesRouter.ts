import express from "express";
import {
  getExercises,
  deleteExercise,
  createExercise,
  getById,
} from "../../controllers/exercisesControllers/exercisesControllers";

const theWodBuilderRouter = express.Router();

theWodBuilderRouter.get("/exercises", getExercises);
theWodBuilderRouter.delete("/:id", deleteExercise);
theWodBuilderRouter.post("/create", createExercise);
theWodBuilderRouter.get("/:id", getById);

export default theWodBuilderRouter;
