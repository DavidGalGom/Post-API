# Serverless-API

This project is an API rest of post, is done with node.js + express using typescript, eslint, Mongoose as database, Jest for unit test and Cypress for integration tests.

The project is deployed in Heroku: https://api-post-serverless.herokuapp.com ;

Lately, using the AWS the project will be released serverless.

I've added husky and github workflows to help me code better.

There is an auth and isAdminAuth method using jsonwebtoken.

I've used the library express-validation to validate the body of the routes.

There are 3 databases: 1 for production, 1 for development and the last for testing with cypress.

If you are interested and want to see more, there is a POSTMAN collection, and a .env file that I can show if is needed.

## The project have the following endpoints:

-https://api-post-serverless.herokuapp.com/users/register "POST"method: For register a new user.

-https://api-post-serverless.herokuapp.com/users/login "POST"method: For login registered users.

-https://api-post-serverless.herokuapp.com/posts "GET"method: Shows the list of posts.

-https://api-post-serverless.herokuapp.com/posts "POST"method: Create a new post, needed to be log and authenticated.

-https://api-post-serverless.herokuapp.com/posts/:idPost/:idOwner "DELETE"method: Delete a post, only if you are the owner of it.

-https://api-post-serverless.herokuapp.com/posts/:idPost/:idOwner "PUT"method: Updates a post, only if you are the owner of it.

-https://api-post-serverless.herokuapp.com/posts/:idPost "DELETE"method : Delete any post, needed to be an admin.

The body and the headers needed to use the endpoints are in the code.

## There is a trello where you can check my progress doing the project

-Can see ordered all my features done, and all the incoming progress.

https://trello.com/b/2pRycz3G/api-serverless

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
