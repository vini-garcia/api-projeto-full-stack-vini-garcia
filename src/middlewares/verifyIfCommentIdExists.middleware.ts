import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities";
import { AppError } from "../errors";
import { Repository } from "typeorm";

const verifyIfCommentIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const commentId: string = request.params.id;

  const repo: Repository<Comment> = AppDataSource.getRepository(Comment);
  const comment: Comment | null = await repo.findOneBy({ id: commentId });

  if (!comment) throw new AppError("Comment not found", 404);

  response.locals = { ...response.locals, comment };

  return next();
};

export default verifyIfCommentIdExists;
