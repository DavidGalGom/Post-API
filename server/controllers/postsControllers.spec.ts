import Post from "../../database/models/post";
import TestError from "../../interfaces/testError";
import { addPost, getPostsList } from "./postsControllers";
import IResponseTest from "../../interfaces/response";

jest.mock("../../database/models/post");
const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

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
      Post.find = jest.fn().mockResolvedValue(posts);
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

describe("Given an addPost function", () => {
  describe("When it receives a resolved value", () => {
    test("Then it should create a new post with a code 201", async () => {
      const req = {
        body: {
          title: "post title",
          body: "body of the post",
        },
      };
      const res = mockResponse();
      const newPost = req.body;
      Post.create = jest.fn().mockResolvedValue(newPost);

      await addPost(req, res, null);

      expect(res.json).toHaveBeenCalledWith(newPost);
    });
  });

  describe("When it receives a rejected promise", () => {
    test("Then it should summon next with an error", async () => {
      const req = jest.fn();
      Post.create = jest.fn().mockRejectedValue({});
      const next = jest.fn();
      const res = mockResponse();

      await addPost(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
