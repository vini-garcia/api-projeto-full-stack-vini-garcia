import { Router } from "express";
import { userControllers } from "../controllers";
import middlewares from "../middlewares";
import { userSchemaRequest, userSchemaUpdate } from "../schemas";

const userRoutes: Router = Router();

userRoutes.get("/me", middlewares.verifyIfTokenIsValid, userControllers.getUser);

userRoutes.post("", middlewares.validateBody(userSchemaRequest), userControllers.createNewUser);

userRoutes.patch(
  "/:id",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfIsUsersOwner,
  middlewares.validateBody(userSchemaUpdate),
  userControllers.updateUser
);

userRoutes.delete(
  "/:id",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfIsUsersOwner,
  userControllers.destroyUser
);

export default userRoutes;
