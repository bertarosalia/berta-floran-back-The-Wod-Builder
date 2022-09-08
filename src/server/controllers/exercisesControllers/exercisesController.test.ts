import { NextFunction, Request, Response } from "express";
import Exercise from "../../../database/models/Exercise";
import ExerciseCreate from "../../../types/exercisesInterface";
import CustomError from "../../../utils/CustomError";
import { deleteExercise, getExercises } from "./exercisesControllers";

const exampleRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
} as Partial<Response>;

describe("Given a controller get all exercises", () => {
  describe("When it receives a request", () => {
    test("Then it should response with a status code 200, and a mockExercise", async () => {
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

      Exercise.find = jest.fn();

      const expectedStatusCode = 200;

      await getExercises(exampleRequest as Request, exampleRes as Response);

      expect(exampleRes.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
describe("Given a controller delete one exercise by id", () => {
  describe("When it receives a request with a delete exercise controller and a valid id", () => {
    test("Then it should response with a method status and a 'Successfully deleted exercise' message", async () => {
      const expectedJsonMessage = { message: "Successfully deleted exercise" };
      const exampleRequest = {
        params: { id: "12" },
      } as Partial<Request>;

      const next = jest.fn() as NextFunction;
      Exercise.findByIdAndDelete = jest.fn().mockResolvedValue(exampleRequest);
      const expectedStatus = 200;

      await deleteExercise(
        exampleRequest as Request,
        exampleRes as Response,
        next as NextFunction
      );

      expect(exampleRes.status).toHaveBeenCalledWith(expectedStatus);
      expect(exampleRes.json).toHaveBeenCalledWith(expectedJsonMessage);
    });
  });
  describe("When it receives a request to delete an item but can´t find it", () => {
    test("It should throw a custom error with 404 as code", async () => {
      const requestExample = {
        params: { id: "" },
      } as Partial<Request>;

      const expectedError = new CustomError(
        404,
        "No exercises found",
        "Error deleting exercise"
      );

      Exercise.findByIdAndDelete = jest.fn().mockRejectedValue(expectedError);

      const next = jest.fn() as NextFunction;

      const responseExample = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      await deleteExercise(
        requestExample as Request,
        responseExample as Response,
        next
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
