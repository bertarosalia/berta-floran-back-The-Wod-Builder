import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../../database/models/User";
import { userLogin, userRegister } from "./usersController";
import CustomError from "../../../utils/CustomError/CustomError";
import { DatabaseUser, LoginUser } from "../../../types/user";

describe("Given the user controller", () => {
  const exampleUser = {
    name: "",
    eMail: "",
    password: "",
  };

  const exampleRequest = {
    body: exampleUser,
  } as Partial<Request>;

  const exampleRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as Partial<Response>;

  const exampleNext: Partial<NextFunction> = jest.fn();
  describe("When it´s called user register controller", () => {
    describe("When it receives an object as a response", () => {
      test("Then it should invoke the response method with status '201'", async () => {
        const status = 201;

        User.create = jest.fn();

        await userRegister(
          exampleRequest as Request,
          exampleRes as Response,
          exampleNext as NextFunction
        );

        expect(exampleRes.status).toHaveBeenCalledWith(status);
      });
    });
    describe("When it doesn't receceives an user with required properties", () => {
      test("Then it should nexted an error", async () => {
        const exampleError = new CustomError(404, "Error", "Public Error");
        User.create = jest.fn().mockRejectedValue(exampleError);

        await userRegister(
          exampleRequest as Request,
          exampleRes as Response,
          exampleNext as NextFunction
        );

        expect(exampleNext).toBeCalledWith(exampleError);
      });
    });
  });
  describe("When it´s called user login controller", () => {
    const mockUserLogin: LoginUser = {
      email: "Pepito",
      password: "123456",
    };
    const mockUserFound: DatabaseUser = {
      name: "",
      password: "",
      email: "",
      id: "",
      image: "",
    };
    const req: Partial<Request> = {
      body: mockUserLogin,
    };
    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next: Partial<NextFunction> = jest.fn();

    describe("And it receives a request with an user", () => {
      test("Then call the response method status with 200", async () => {
        const bcryptResolve = true;
        const jwtReturn = "Super Token";

        User.findOne = jest.fn().mockResolvedValue(mockUserFound);
        bcrypt.compare = jest.fn().mockResolvedValue(bcryptResolve);
        jwt.sign = jest.fn().mockReturnValue(jwtReturn);

        await userLogin(req as Request, res as Response, next as NextFunction);

        expect(res.status).toHaveBeenCalledWith(200);
      });
      describe("And it receives a correct user", () => {
        describe("But user is not found", () => {
          test("Then call the response method next with an error", async () => {
            const userNotFound: null = null;
            const userError = new CustomError(
              403,
              "User not found",
              "User or password not valid"
            );

            User.findOne = jest.fn().mockResolvedValue(userNotFound);

            await userLogin(
              req as Request,
              res as Response,
              next as NextFunction
            );

            expect(next).toHaveBeenCalledWith(userError);
          });
        });
        describe("But error is throwed when finding user", () => {
          test("Then call the response method with an error", async () => {
            const mongooseReject = new Error();
            const userError = new CustomError(403, "", "");

            User.findOne = jest.fn().mockRejectedValue(mongooseReject);

            await userLogin(
              req as Request,
              res as Response,
              next as NextFunction
            );

            expect(next).toHaveBeenCalledWith(userError);
          });
        });
        describe("But password compare returns false", () => {
          test("Then call the response method with an error", async () => {
            const userError = new CustomError(403, "", "");
            const bcryptResolve = false;

            User.findOne = jest.fn().mockResolvedValue(mockUserFound);

            bcrypt.compare = jest.fn().mockResolvedValue(bcryptResolve);

            await userLogin(
              req as Request,
              res as Response,
              next as NextFunction
            );

            expect(next).toHaveBeenCalledWith(userError);
          });
        });
        describe("But password comparer throw an error", () => {
          test("Then call the response method next with an error", async () => {
            const userError = new CustomError(403, "", "");
            const bcryptError = new Error();

            User.findOne = jest.fn().mockResolvedValue(mockUserFound);
            bcrypt.compare = jest.fn().mockRejectedValue(bcryptError);

            await userLogin(
              req as Request,
              res as Response,
              next as NextFunction
            );

            expect(next).toHaveBeenCalledWith(userError);
          });
        });
      });
    });
  });
});
