import express from "express";
import {
  getExercises,
  deleteExercise,
} from "../controllers/exercisesControllers";

const theWodBuilderRouter = express.Router();

theWodBuilderRouter.get("/exercises", getExercises);
theWodBuilderRouter.delete("/:id", deleteExercise);

export default theWodBuilderRouter;
