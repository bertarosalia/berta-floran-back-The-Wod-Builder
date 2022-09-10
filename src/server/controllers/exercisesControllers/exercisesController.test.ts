import { NextFunction, Request, Response } from "express";
import Exercise from "../../../database/models/Exercise";
import CustomError from "../../../utils/CustomError";
import { deleteExercise, getExercises } from "./exercisesControllers";

let res: Partial<Response>;
let next: Partial<NextFunction>;

beforeAll(() => {
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  next = jest.fn();
});

afterAll(() => {
  jest.clearAllMocks();
});

describe("Given a controller get all exercises", () => {
  describe("When it receives a request", () => {
    const req: Partial<Request> = {};

    test("Then it should response with a status code 200, and a mockExercise", async () => {
      const mockExerciseList = [{ exercise: "" }];
      Exercise.find = jest.fn().mockResolvedValue(mockExerciseList);

      await getExercises(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    describe("And database return a void list of exercises", () => {
      test("Then call next function with an error", async () => {
        const errorExercise = new CustomError(
          404,
          "No exercises in database",
          "Exercises not found"
        );

        const mockExerciseList: void[] = [];
        Exercise.find = jest.fn().mockResolvedValue(mockExerciseList);

        await getExercises(
          req as Request,
          res as Response,
          next as NextFunction
        );

        expect(next).toHaveBeenCalledWith(errorExercise);
      });
    });
  });
});

describe("Given a controller delete one exercise by id", () => {
  describe("When it receives a request with a delete exercise controller and a valid id", () => {
    test("Then it should response with a method status and a 'Successfully deleted exercise' message", async () => {
      const expectedJsonMessage = { message: "Successfully deleted exercise" };
      const req = {
        params: { id: "12" },
      } as Partial<Request>;

      Exercise.findByIdAndDelete = jest.fn().mockResolvedValue(req);
      const expectedStatus = 200;

      await deleteExercise(
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
      expect(res.json).toHaveBeenCalledWith(expectedJsonMessage);
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

      const responseExample = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as Partial<Response>;

      await deleteExercise(
        requestExample as Request,
        responseExample as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a create exercise controller", () => {
  describe("When it´s called with an exercises as request", () => {
    test("It should response with an exercise created", () => {});
  });
});
