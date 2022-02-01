import { before, cy, describe, it } from "local-cypress";

const user: {
  name: string;
  userName: string;
  password: string;
  email: string;
  isAdmin: boolean;
  posts: [];
} = {
  name: "David",
  userName: "David",
  password: "1234abcD-",
  email: "david@gmail.com",
  isAdmin: false,
  posts: [],
};

const userLogin: {
  userName: string;
  password: string;
} = {
  userName: "David",
  password: "1234abcD-",
};

describe("Given a /users/register endpoint", () => {
  describe("When you send a request with a correct body", () => {
    it("Then it will get", () => {
      cy.request("POST", "http://localhost:1000/users/register", user);
    });

    it("Then the response will send status 201", () => {
      cy.request("POST", "http://localhost:1000/users/register", user)
        .its("status")
        .should("equal", 201);
    });
  });
});

describe("Given a /users/login endpoint", () => {
  before(() => {
    cy.request("POST", "http://localhost:1000/users/register", user);
  });
  describe("When it sends a post request with a registered user", () => {
    it("Then it should send a 200 status", () => {
      cy.request("POST", "http://localhost:1000/users/login", userLogin)
        .its("status")
        .should("equal", 200);
    });
  });

  describe("When it sends a post request with a not registered user", () => {
    it("Then it should send a 401 status", () => {
      const userNotLog: { userName: string; password: string } = {
        userName: "Dav",
        password: "1234abcD-",
      };
      cy.request({
        method: "POST",
        url: "http://localhost:1000/users/login",
        body: userNotLog,
        failOnStatusCode: false,
      })
        .its("status")
        .should("equal", 401);
    });
  });
});
