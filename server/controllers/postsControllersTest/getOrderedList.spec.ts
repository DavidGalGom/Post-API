import { expect } from "@jest/globals";
import Post from "../../../database/models/post";
import TestError from "../../../interfaces/testError";
import { getOrderedList } from "../postsControllers";

jest.mock("../../../database/models/post");

describe("Given a getOrderedList function", () => {
  describe("When it receives a wrong request", () => {
    test("Then it should summon next with a 400 code and a message", async () => {
      const next = jest.fn();
      const error = new Error("Can't find the posts") as TestError;
      error.code = 400;
      Post.find = jest.fn().mockResolvedValue(null);

      await getOrderedList(null, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Can't find the posts"
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
    });
  });

  describe("When it receives a res with posts", () => {
    test("Then it should summon res.json with orderedPosts", async () => {
      const posts: {
        title: string;
        body: string;
        releaseDate: Date | string;
      }[] = [
        {
          title: "title of the sample post for testing",
          body: "body of the sample post for testing",
          releaseDate: "2022-01-31T16:58:31.816Z",
        },
        {
          title: "title of the sample post for testing 2",
          body: "body of the sample post for testing 2",
          releaseDate: "2022-01-31T16:38:31.816Z",
        },
      ];
      const orderedPosts: {
        title: string;
        body: string;
        releaseDate: Date | string;
      }[] = [
        {
          title: "title of the sample post for testing",
          body: "body of the sample post for testing",
          releaseDate: "2022-01-31T16:58:31.816Z",
        },
        {
          title: "title of the sample post for testing 2",
          body: "body of the sample post for testing 2",
          releaseDate: "2022-01-31T16:38:31.816Z",
        },
      ];
      Post.find = jest
        .fn()
        .mockReturnValue({ populate: jest.fn().mockResolvedValue(posts) });
      const res = {
        json: jest.fn(),
      };

      await getOrderedList(null, res, null);

      expect(Post.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(orderedPosts);
    });
  });
});
