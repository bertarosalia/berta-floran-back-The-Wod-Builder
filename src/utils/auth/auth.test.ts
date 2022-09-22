import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomJwtPayload from "../../types/payload";
import { hashCompare, hashCreator, createToken } from "./auth";

describe("Given auth function", () => {
  describe("Whe it´s called with the hashCreator function", () => {
    describe("And it´s called with randomWord", () => {
      test("Then it should return 'randomWordhasheada", async () => {
        bcrypt.hash = jest.fn().mockResolvedValue("randomWordhasheada");

        const expectedTextHashed = "randomWordhasheada";

        const textHashed = await hashCreator("randomWord");

        expect(textHashed).toBe(expectedTextHashed);
      });
    });
    describe("When it´s called with '123456' and '3gady8gaa89'", () => {
      test("Then it should call the method compare from bcrypt", async () => {
        const text = "123456";
        const hash = "3gady8gaa89";

        const bcryptTest = jest.fn().mockResolvedValue("test");
        (bcrypt.compare as jest.Mock) = bcryptTest;

        await hashCompare(text, hash);

        expect(bcryptTest).toHaveBeenCalledWith(text, hash);
      });
    });
  });
  describe("When it´s called the create token function", () => {
    describe("And it´s called with payload with name", () => {
      test("Then it should return true", async () => {
        const secretWord = process.env.SECRET;
        const payload: CustomJwtPayload = { id: "id", name: "user", image: "" };

        const mockSign = jest.fn();
        jwt.sign = mockSign;

        await createToken(payload);

        expect(mockSign).toHaveBeenCalledWith(payload, secretWord);

        // const user = { name: "Andrea", id: "3", image: "" };
        // const mockedToken = "3p985qwrywn98pvwwqtmw";
        // jwt.sign = jest.fn().mockResolvedValue(mockedToken);

        // const tokenCreated = createToken(user);

        // expect(tokenCreated).toBe(mockedToken);
      });
    });
  });
});
