import Post from "../../../database/models/post";
import TestError from "../../../interfaces/testError";
import { deletePost } from "../postsControllers";

jest.mock("../../../database/models/post");

describe("Given a deletePost function", () => {
  describe("When it receives an id of a post and a correct idOwner", () => {
    test("Then it should summon the res.json with the id", async () => {
      const idPost: number = 123456789;
      const idOwner: number = 12345;
      const userId: number = 12345;
      const req = {
        params: {
          idPost,
          idOwner,
        },
        body: {
          userId,
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
      const userId: number = 1;
      const idPost: number = 123456789;
      const idOwner: number = 1;
      const req = {
        params: {
          idPost,
          idOwner,
        },
        body: {
          userId,
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
          idPost: 12345678,
          idOwner: 12345,
        },
        body: {
          userId: 12345,
        },
      };
      const next = jest.fn();

      await deletePost(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("message", "Post not found");
      expect(next.mock.calls[0][0]).toHaveProperty("code", 404);
    });
  });

  describe("When the userId and the ownerId are not the same", () => {
    test("Then next it should be called with a code 401 and a message Can't delete other people posts", async () => {
      const idPost = 12345;
      const idOwner = 12;
      const userId = 1;
      const req: {
        params: { idPost: number; idOwner: number };
        body: { userId: number };
      } = {
        params: {
          idPost,
          idOwner,
        },
        body: {
          userId,
        },
      };
      const next = jest.fn();
      Post.findByIdAndDelete = jest.fn().mockResolvedValue(idPost);
      const error: { message: string; code: number } = {
        message: "Can't delete other people posts",
        code: 401,
      };

      await deletePost(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Can't delete other people posts"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});
