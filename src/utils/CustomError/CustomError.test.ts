import CustomError from "./CustomError";

describe("Given a Custom Error class", () => {
  describe("When instantiated with a 200, a 'public message' and a 'private message'", () => {
    test("It should creates an object wit code 200, a 'public message' and a 'private message'", () => {
      const statusCodeTest = 200;
      const testPublicMessage = "public message";
      const testPrivateMessage = "private message";

      const newCustomError = new CustomError(
        statusCodeTest,
        testPrivateMessage,
        testPublicMessage
      );

      expect(newCustomError).toHaveProperty("statusCode", statusCodeTest);
      expect(newCustomError).toHaveProperty("message", testPrivateMessage);
      expect(newCustomError).toHaveProperty("publicMessage", testPublicMessage);
    });
  });
});
