import { Request, Response } from "express";
import {
  createNewUserService,
  destroyUserService,
  getUserService,
  updateUserService,
} from "../services/users/";
import { TUserResponse, Tuser } from "../interfaces";

const createNewUser = async (request: Request, response: Response): Promise<Response> => {
  const user: TUserResponse = await createNewUserService(request.body);

  return response.status(201).json(user);
};

const getUser = async (request: Request, response: Response): Promise<Response> => {
  const user: TUserResponse = await getUserService(response.locals.tokenId);

  return response.status(201).json(user);
};

const updateUser = async (request: Request, response: Response): Promise<Response> => {
  const foundUser: Tuser = response.locals.user;

  const user: TUserResponse = await updateUserService(foundUser, request.body);

  return response.status(200).json(user);
};

const destroyUser = async (request: Request, response: Response): Promise<Response> => {
  await destroyUserService(response.locals.user);

  return response.status(204).json();
};

export default { createNewUser, updateUser, destroyUser, getUser };
