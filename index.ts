import dotenv from "dotenv";
import "reflect-metadata";
import mongoose from "mongoose";

import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import {
  AppController,
  UserController,
  CommunityController,
  PostController,
} from "./src/controllers";
import { CurrentUserMiddleware } from "./src/middlewares/currentUser.middleware";
import { AuthMiddleware } from "./src/middlewares/auth.middleware";

dotenv.config();

useContainer(Container);

const app = createExpressServer({
  currentUserChecker: CurrentUserMiddleware.currentUserChecker,
  authorizationChecker: AuthMiddleware.authorizationChecker,
  controllers: [
    AppController,
    UserController,
    CommunityController,
    PostController,
  ],
});
const port = process.env.PORT;

// move to env
const uri: string = "mongodb://127.0.0.1:27017/sample_db";
mongoose
  .connect(uri)
  .then(() =>
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    })
  )
  .catch((error) => {
    throw error;
  });
