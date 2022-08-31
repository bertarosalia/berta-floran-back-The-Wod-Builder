import express from "express";
import getExercises from "../controllers/exercisesControllers";

const theWodBuilderRouter = express.Router();

theWodBuilderRouter.get("/exercises", getExercises);

export default theWodBuilderRouter;
