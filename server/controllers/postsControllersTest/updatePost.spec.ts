import { expect } from "@jest/globals";
import Post from "../../../database/models/post";
import IResponseTest from "../../../interfaces/response";
import { updatePost } from "../postsControllers";

jest.mock("../../../database/models/post");
const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

describe("Given a updatePost function", () => {
  describe("When it receives a wrong request", () => {
    test("Then it should return an error code 400 and message Bad update request", async () => {
      const idPost: number = 123456789;
      const idOwner: number = 123;
      const owner: number = 123;
      const req = {
        params: {
          idPost,
          idOwner,
        },
        body: {
          owner,
        },
      };
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 400,
        message: "Bad update request",
      };
      Post.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await updatePost(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a wrong post id", () => {
    test("Then it should return an error code 404 and message Post not found", async () => {
      const idPost: number = 1;
      const idOwner: number = 123;
      const owner: number = 123;
      const req = {
        params: {
          idPost,
          idOwner,
        },
        body: {
          owner,
        },
      };
      const next = jest.fn();
      const error: { code: number; message: string } = {
        code: 404,
        message: "Post not found",
      };
      Post.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await updatePost(req, null, next);

      expect(next).toHaveBeenCalled();
      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives an id and a correct params body", () => {
    test("Then it should update the post with the new data", async () => {
      const idPost: number = 123456789;
      const idOwner: number = 123;
      const owner: number = 123;
      const req = {
        params: {
          idPost,
          idOwner,
        },
        body: {
          owner,
        },
      };
      const res = mockResponse();
      Post.findByIdAndUpdate = jest.fn().mockResolvedValue(idPost);

      await updatePost(req, res, null);

      expect(res.json).toHaveBeenCalledWith(idPost);
    });
  });

  describe("When the owner and the ownerId are not the same", () => {
    test("Then next it should be called with a code 401 and a message Can't update other people posts", async () => {
      const idPost: number = 12345;
      const idOwner: number = 12;
      const owner: number = 1;
      const req: {
        params: { idPost; idOwner };
        body: { owner };
      } = {
        params: {
          idPost,
          idOwner,
        },
        body: {
          owner,
        },
      };
      const next = jest.fn();
      Post.findByIdAndUpdate = jest.fn().mockResolvedValue(idPost);
      const error: { message: string; code: number } = {
        message: "Can't update other people posts",
        code: 401,
      };

      await updatePost(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Can't update other people posts"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 401);
    });
  });
});
