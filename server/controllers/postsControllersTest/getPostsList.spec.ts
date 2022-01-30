import Post from "../../../database/models/post";
import TestError from "../../../interfaces/testError";
import { getPostsList } from "../postsControllers";

jest.mock("../../../database/models/post");

describe("Given a getPostsList function", () => {
  describe("When it receives an object res", () => {
    test("Then it should summon the method json", async () => {
      const posts = [
        {
          title: "title of the sample post for testing",
          body: "body of the sample post for testing",
        },
        {
          title: "title of the sample post for testing 2",
          body: "body of the sample post for testing 2",
        },
      ];
      Post.find = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(posts) });
      const res = {
        json: jest.fn(),
      };

      await getPostsList(null, res, null);

      expect(Post.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(posts);
    });
  });

  describe("When its called wrong", () => {
    test("Then it should return an error and code 400 ", async () => {
      Post.find = jest.fn().mockResolvedValue(null);
      const next = jest.fn();
      const expectedError = new Error("Can't find the posts") as TestError;
      expectedError.code = 400;

      await getPostsList(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Can't find the posts"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });
});
