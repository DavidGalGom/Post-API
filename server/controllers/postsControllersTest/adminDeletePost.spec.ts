import Post from "../../../database/models/post";
import { adminDeletePost } from "../postsControllers";

jest.mock("../../../database/models/post");

describe("Given a adminDeletePost endpoint", () => {
  describe("When it receives a correct idPost", () => {
    test("Then it should summon res.json with the deleted post ID", async () => {
      const idPost: number = 123;
      const req: { params: { idPost } } = {
        params: {
          idPost,
        },
      };
      const res = { json: jest.fn() };
      Post.findByIdAndDelete = jest.fn().mockResolvedValue(idPost);

      await adminDeletePost(req, res, null);

      expect(Post.findByIdAndDelete).toHaveBeenCalledWith(idPost);
      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it receives an inexistent idPost", () => {
    test("Then it should call next with a 404 code and Post not found", async () => {
      const idPost: number = 1;
      const req: { params: { idPost } } = {
        params: {
          idPost,
        },
      };
      const next = jest.fn();
      Post.findByIdAndDelete = jest.fn().mockResolvedValue(null);
      const error: { message: string; code: number } = {
        message: "Post not found",
        code: 404,
      };

      await adminDeletePost(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("message", "Post not found");
      expect(error).toHaveProperty("code", 404);
    });
  });

  describe("When it receives a wrong request", () => {
    test("Then it should call next with a 400 code and Bad request message", async () => {
      const idPost: number = 1;
      const req: { params: { idPost } } = {
        params: {
          idPost,
        },
      };
      const next = jest.fn();
      const error: { message: string; code: number } = {
        message: "Bad request",
        code: 400,
      };
      Post.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      await adminDeletePost(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(error).toHaveProperty("message", "Bad request");
      expect(error).toHaveProperty("code", 400);
    });
  });
});
