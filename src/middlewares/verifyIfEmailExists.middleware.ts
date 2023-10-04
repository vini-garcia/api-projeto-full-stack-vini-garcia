import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const verifyIfEmailExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const email: string = request.body.email;

  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepo.findOne({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials!", 401);
  }

  return next();
};

export default verifyIfEmailExists;
