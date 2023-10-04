import { Router } from "express";
import middlewares from "../middlewares";
import { loginSchema } from "../schemas";
import loginUserController from "../controllers/login.controllers";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  middlewares.validateBody(loginSchema),
  middlewares.verifyIfEmailExists,
  loginUserController.loginUser
);

export default loginRoutes;
