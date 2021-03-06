# Post-API

This project is an API rest of post, is done with node.js + express using typescript, eslint, Mongoose as database, Jest for unit test and Cypress for integration tests.

I've added husky and github workflows to help me code better.

There is an auth and isAdminAuth method using jsonwebtoken.

I've used the library express-validation to validate the body of the routes.

There are 3 databases: 1 for production, 1 for development and the last for testing with cypress.

If you are interested and want to see more, there is a POSTMAN collection, and a .env file that I can show if is needed.

## The project have the following endpoints:

-url/users/register "POST"method: For register a new user.

-url/users/login "POST"method: For login registered users.

-url/posts "GET"method: Shows the list of posts.

-url/posts "POST"method: Create a new post, needed to be log and authenticated.

-url/posts/:idPost/:idOwner "DELETE"method: Delete a post, only if you are the owner of it.

-url/posts/:idPost/:idOwner "PUT"method: Updates a post, only if you are the owner of it.

-url/posts/:idPost "DELETE"method : Delete any post, needed to be an admin.

The body and the headers needed to use the endpoints are in the code.

## Commands to try out the project

```
npm install // to install all packages used
```

### Run the server

```
npm start // production server
npm run start-dev // production server with nodemon
npm run start-cy // testing server with cypress
```

### Compiles Typescript

```
npx tsc
npx tsc --watch
```

### Run unit tests with jest

```
npm test
npm run test-w // watchAll
npm run test-cov // coverage
```

### Run integration tests with cypress

```
npm run cy
npm run cy-open
```
