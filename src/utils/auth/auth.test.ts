import bcrypt from "bcryptjs";
import { hashCompare, hashCreator } from "./auth";

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
});
