import { cy, describe, it } from "local-cypress";

const newPost: { title: string; body: string; owner: string } = {
  title: "New post title",
  body: "New post body",
  owner: "61f2b33ceb028d6e619cf0ca",
};

let token: { ownerId: string; ownerToken: string };
const newUser: { userName: string; password: string } = {
  userName: "David",
  password: "1234abcD-",
};

beforeEach(() => {
  cy.request("POST", "http://localhost:1000/users/login", newUser).then(
    (response) => {
      token = response.body;
    }
  );
});

describe("Given a /posts endpoint", () => {
  describe("When you send a  GET request ", () => {
    it("Then it will get", () => {
      cy.request("GET", "http://localhost:1000/posts");
    });

    it("Then the response will send status 200", () => {
      cy.request("GET", "http://localhost:1000/posts")
        .its("status")
        .should("equal", 200);
    });
  });

  describe("When you send a POST request with a correct auth", () => {
    it("Then it should create the new post", () => {
      cy.request({
        method: "POST",
        url: "http://localhost:1000/posts",
        body: newPost,
        headers: {
          Authorization: `Bearer ${token.ownerToken}`,
        },
      })
        .its("status")
        .should("equal", 201);
    });
  });
});
