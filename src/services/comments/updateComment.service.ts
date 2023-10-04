import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import { AppError } from "../../errors";
import { commentSchemaResponse } from "../../schemas";
import { TcommentUpdate } from "../../interfaces";

const updateCommentService = async (commentId: string, payload: any): Promise<TcommentUpdate> => {
  const commentRepo: Repository<Comment> = AppDataSource.getRepository(Comment);
  const oldComment: Comment | null = await commentRepo.findOne({
    where: {
      id: commentId,
    },
    relations: {
      announcements: true,
      user: true,
    },
  });

  if (!oldComment || oldComment.id !== commentId) {
    throw new AppError("Comment not found", 404);
  }

  const newComment: Comment[] = commentRepo.create({
    ...(oldComment || {}),
    ...payload,
  });

  await commentRepo.save(newComment);

  return commentSchemaResponse.parse(newComment);
};

export { updateCommentService };
