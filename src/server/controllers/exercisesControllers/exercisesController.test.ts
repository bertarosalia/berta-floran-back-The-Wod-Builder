import { NextFunction, Request, Response } from "express";
import Exercise from "../../../database/models/Exercise";
import CustomError from "../../../utils/CustomError";
import { deleteExercise, getExercises } from "./exercisesControllers";

let res: Partial<Response>;
let next = jest.fn() as NextFunction;

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

jest.mock("../../../database/models/Exercise", () => ({
  find: jest.fn().mockReturnValue([
    {
      id: "2151",
      body: "legs",
      name: "back squat",
      description: "",
      image: "http",
    },
  ]),
}));

describe("Given a controller get all exercises", () => {
  describe("When it receives a request", () => {
    const req: Partial<Request> = {};

    test("Then it should response with a status code 200, and a mockExercise", async () => {
      const mockExerciseList = [{ exercise: "" }];
      Exercise.find = jest.fn().mockResolvedValue(mockExerciseList);

      await getExercises(req as Request, res as Response, next as NextFunction);

      expect(res.status).toHaveBeenCalledWith(200);
    });
    describe("When called but doesn´t return any valid data", () => {
      test("Then call next function with an error", async () => {
        Exercise.find = jest.fn().mockRejectedValue(new Error());

        const expectedError = new CustomError(
          404,
          "No exercises in database",
          "Exercises not found"
        );

        await getExercises(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(expectedError);
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
      describe("When it receives a request to delete an exercise, but the value is null", () => {
        test("Then it should send a response with the method status 404", async () => {
          const requestTest = {
            params: { id: "515165" },
          } as Partial<Request>;

          const expectedResult: void = null;

          Exercise.findByIdAndDelete = jest
            .fn()
            .mockResolvedValue(expectedResult);

          const expectedStatus = 404;

          const responseTest = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
          } as Partial<Response>;

          await deleteExercise(
            requestTest as Request,
            responseTest as Response,
            next
          );

          expect(responseTest.status).toHaveBeenCalledWith(expectedStatus);
        });
      });
    });
  });
});
