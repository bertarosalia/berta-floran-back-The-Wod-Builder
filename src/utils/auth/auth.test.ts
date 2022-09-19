import bcrypt from "bcryptjs";
import hashCreator from "./auth";

describe("Given a hashCreator function", () => {
  describe("Whe it´s called with 'randomWord'", () => {
    test("Then it should return 'randomWordhasheada", async () => {
      bcrypt.hash = jest.fn().mockResolvedValue("randomWordhasheada");

      const expectedTextHashed = "randomWordhasheada";

      const textHashed = await hashCreator("randomWord");

      expect(textHashed).toBe(expectedTextHashed);
    });
  });
});
