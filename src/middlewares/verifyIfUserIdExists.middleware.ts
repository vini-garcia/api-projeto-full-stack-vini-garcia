import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";
import { Repository } from "typeorm";

const verifyIfUserIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const userId: string = response.locals.tokenId;

  const repo: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await repo.findOneBy({ id: userId });

  if (!user) throw new AppError("User not found", 404);

  response.locals = { ...response.locals, user };

  return next();
};

export default verifyIfUserIdExists;
