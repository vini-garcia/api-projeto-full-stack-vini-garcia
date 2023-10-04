import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const verifyIfIsUsersOwner = async (request: Request, response: Response, next: NextFunction) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userId: string = request.params.id;
  const loggedInUserId: string = response.locals.tokenId;

  const user = await usersRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError("User not found!", 404);
  }

  if (user.id !== loggedInUserId) {
    throw new AppError("You don`t have permission!", 403);
  }

  response.locals.user = user;

  return next();
};

export default verifyIfIsUsersOwner;
