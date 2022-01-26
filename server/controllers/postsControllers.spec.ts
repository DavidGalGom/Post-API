import Post from "../../database/models/post";
import getPostsList from "./postsControllers";

jest.mock("../../database/models/post");

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
});
