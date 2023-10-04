import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entities";
import { AppError } from "../errors";

const verifyIfIsCommentsOwner = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const repo = AppDataSource.getRepository(Comment);

  const commentId: string = request.params.id;
  const userId: string = response.locals.tokenId;

  const comment = await repo.findOne({
    where: {
      id: commentId,
    },
    relations: {
      user: true,
    },
  });

  if (!comment) {
    throw new AppError("Comment not found!", 404);
  }

  if (comment.user.id !== userId) {
    throw new AppError("You don`t have permission!", 403);
  }

  return next();
};

export default verifyIfIsCommentsOwner;
