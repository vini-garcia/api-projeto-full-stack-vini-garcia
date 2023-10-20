import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Comment } from "../../entities";
import { AppError } from "../../errors";

const destroyCommentService = async (commentId: string): Promise<void> => {
  const commentRepo: Repository<Comment> = AppDataSource.getRepository(Comment);
  const comment: Comment | null = await commentRepo.findOneBy({
    id: commentId,
  });

  if (!comment) {
    throw new AppError("Comment not found!", 404);
  }

  await commentRepo.remove(comment);
};

export { destroyCommentService };
