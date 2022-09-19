import { Response, Request, NextFunction } from "express";
import { ValidationError } from "express-validation";
import CustomError from "../../utils/CustomError/CustomError";
import { generalError, notFoundError } from "./errors";

describe("Given a general error function", () => {
  const exampleReq = {};
  const exampleNext = jest.fn();

  describe("When is called", () => {
    test("Then it should response with status method with the received error message and code", async () => {
      const exampleError = new CustomError(254, "", "Everything went wrong");

      const exampleRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(exampleError.publicMessage),
      };

      const status = 254;
      const responseJson = { error: exampleError.publicMessage };

      await generalError(
        exampleError as CustomError,
        exampleReq as unknown as Request,
        exampleRes as unknown as Response,
        exampleNext as NextFunction
      );

      expect(exampleRes.status).toBeCalledWith(status);
      expect(exampleRes.json).toBeCalledWith(responseJson);
    });
  });
  describe("When it's called with a status code null", () => {
    test("Then it should respond with a status code 500", async () => {
      const error = new CustomError(null, "", "");

      const exampleRequest = {};
      const exampleResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(error.publicMessage),
      };

      const nextExample = jest.fn();

      const expectedStatus = 500;

      await generalError(
        error as CustomError,
        exampleRequest as unknown as Request,
        exampleResponse as unknown as Response,
        nextExample as NextFunction
      );

      expect(exampleResponse.status).toBeCalledWith(expectedStatus);
    });
  });
  describe("When instantiated with a null public message", () => {
    test("Then it shold response wit a public message 'Everything went wrong'", async () => {
      const error = new CustomError(500, "", null);

      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(error.publicMessage),
      } as Partial<Response>;

      const expectedResponse = { error: "Everything went wrong" };

      await generalError(
        error,
        exampleReq as Request,
        response as Response,
        exampleNext
      );

      expect(response.json).toBeCalledWith(expectedResponse);
    });
    describe("When it's called with a ValidationError", () => {
      test("Then it should send a 400 status and error message", async () => {
        const errorTest = new ValidationError(
          {
            body: [
              {
                message: "Error 1",
                isJoi: true,
                annotate: () => "",
                _original: "",
                name: "ValidationError",
                details: [],
              },
              {
                message: "Error 2",
                isJoi: true,
                annotate: () => "",
                _original: "",
                name: "ValidationError",
                details: [],
              },
            ],
          },
          { statusCode: 400 }
        );

        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        } as Partial<Response>;

        const expectedStatus = 400;

        await generalError(
          errorTest,
          exampleReq as Request,
          response as Response,
          exampleNext
        );

        expect(response.json).toBeCalledWith({ error: "Wrong data" });
        expect(response.status).toBeCalledWith(expectedStatus);
      });
    });
  });
});
describe("Given a not found error middleware", () => {
  describe("When it receives a response object", () => {
    const exampleResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    const exampleRequest = {} as Partial<Request>;

    test("The it should call the response method status with code 404", () => {
      const status = 404;

      notFoundError(exampleRequest as Request, exampleResponse as Response);

      expect(exampleResponse.status).toHaveBeenCalledWith(status);
    });

    test("Then it should call the response method with a json object and an error property", () => {
      const errorResponse = { error: "Endpoint not found" };

      notFoundError(exampleRequest as Request, exampleResponse as Response);

      expect(exampleResponse.json).toHaveBeenCalledWith(errorResponse);
    });
  });
});
