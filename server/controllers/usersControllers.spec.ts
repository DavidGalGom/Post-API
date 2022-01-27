import bcrypt from "bcrypt";
import User from "../../database/models/user";
import addUser from "./usersControllers";
import IResponseTest from "../../interfaces/response";
import TestError from "../../interfaces/testError";

jest.mock("../../database/models/user");
jest.mock("bcrypt");
const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given a addUser function", () => {
  describe("When it receives a new user", () => {
    test("Then it should summon res.json with a new user", async () => {
      const user = {
        name: "David",
        userName: "David",
        password: "******",
        email: "david@david.com",
        isAdmin: false,
        posts: [],
      };
      const req = {
        body: user,
      };
      const res = mockResponse();
      bcrypt.hash = jest.fn().mockResolvedValue(user.password);
      User.create = jest.fn().mockResolvedValue(user);

      await addUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe("When it receives a new user with wrong params", () => {
    test("Then it should summon next function with an error", async () => {
      const user = {
        name: "David",
        userName: "David",
        password: "******",
        isAdmin: false,
        posts: [],
      };
      const req = {
        body: user,
      };
      const next = jest.fn();
      const expectedError = new Error("Wrong data") as TestError;
      expectedError.code = 400;
      bcrypt.hash = jest.fn().mockResolvedValue(user.password);
      User.create = jest.fn().mockRejectedValue(expectedError);

      await addUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
});
