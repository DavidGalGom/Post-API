import { cy, describe, it } from "local-cypress";

const randomUser: {
  name: string;
  userName: string;
  password: string;
  email: string;
  isAdmin: boolean;
} = {
  name: "David",
  userName: "David",
  password: "1234abcD-",
  email: "david@gmail.com",
  isAdmin: false,
};

describe("Given a /user/register endpoint", () => {
  describe("When you send a request with a correct body", () => {
    it("Then it will get", () => {
      cy.request("POST", "http://localhost:1000/users/register", randomUser);
    });

    it("Then the response will send status 201", () => {
      cy.request("POST", "http://localhost:1000/users/register", randomUser)
        .its("status")
        .should("equal", 201);
    });
  });
});
