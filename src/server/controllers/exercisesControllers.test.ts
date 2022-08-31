import { Request, Response } from "express";
import Exercise from "../../database/models/Exercise";
import ExerciseCreate from "../../types/exercisesInterface";
import getExercises from "./exercisesControllers";

describe("Given a getExercises controller", () => {
  const exampleExercise: ExerciseCreate = {
    body: "leg",
    name: "deadlift",
    description: "",
    image: "",
  };

  const exampleRequest = {
    body: {
      exercise: exampleExercise,
    },
  } as Partial<Request>;

  const exampleRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  describe("When it receives an object as a response", () => {
    test("Then it should invoke the response method with status '200'", async () => {
      const status = 200;

      Exercise.find = jest.fn();

      await getExercises(exampleRequest as Request, exampleRes as Response);

      expect(exampleRes.status).toHaveBeenCalledWith(status);
    });
  });
});
