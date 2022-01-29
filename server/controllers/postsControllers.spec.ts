import Post from "../../database/models/post";
import TestError from "../../interfaces/testError";
import { addPost, deletePost, getPostsList } from "./postsControllers";
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

describe("Given a deletePost function", () => {
  describe("When it receives an id of a post", () => {
    test("Then it should summon the res.json with the id", async () => {
      const idPost: number = 123456789;
      const req = {
        params: {
          idPost,
        },
      };
      const res = { json: jest.fn() };
      Post.findByIdAndDelete = jest.fn().mockResolvedValue({});

      await deletePost(req, res, null);

      expect(Post.findByIdAndDelete).toHaveBeenCalledWith(idPost);
    });
  });

  describe("When it receives a non valid id", () => {
    test("Then it should summon next with and error and a 400 code", async () => {
      const error = new Error("Bad delete request") as TestError;
      error.code = 400;
      Post.findByIdAndDelete = jest.fn().mockRejectedValue(error);
      const req = {
        params: {
          idComponent: 1,
        },
      };
      const next = jest.fn();

      await deletePost(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("message", "Bad delete request");
      expect(error).toHaveProperty("code");
      expect(error.code).toBe(400);
    });
  });

  describe("When it receives an id that there isn't in the postList", () => {
    test("Then it should summon next with a 404 code and a Post not found message", async () => {
      const error: { message: string; code: number } = {
        message: "Post not found",
        code: 404,
      };

      Post.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const req = {
        params: {
          idComponent: 123456789,
        },
      };
      const next = jest.fn();

      await deletePost(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "Post not found");
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });
});
