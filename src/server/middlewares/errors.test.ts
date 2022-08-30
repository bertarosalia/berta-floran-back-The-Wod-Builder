import { Response, Request, NextFunction } from "express";
import ICustomError from "../../types/errorsInterface";
import { generalError, notFoundError } from "./errors";

describe("Given a general error function", () => {
  describe("When is called", () => {
    test("Then it should response with status method with the received error message and code", async () => {
      const exampleError = {
        code: 125,
        publicMessage: "Error has occurred",
      };

      const exampleReq = {};
      const exampleRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(exampleError.publicMessage),
      };

      const exampleNext = jest.fn();
      const status = 125;
      const responseJson = { error: exampleError.publicMessage };

      await generalError(
        exampleError as ICustomError,
        exampleReq as unknown as Request,
        exampleRes as unknown as Response,
        exampleNext as NextFunction
      );

      expect(exampleRes.status).toBeCalledWith(status);
      expect(exampleRes.json).toBeCalledWith(responseJson);
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
