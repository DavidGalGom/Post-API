import { expect } from "@jest/globals";
import Post from "../../../database/models/post";
import IResponseTest from "../../../interfaces/response";
import { addPost } from "../postsControllers";

jest.mock("../../../database/models/post");
const mockResponse = () => {
  const res: IResponseTest = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  };
  return res;
};

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
