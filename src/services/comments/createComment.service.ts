import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement, Comment, User } from "../../entities";
import { commentSchemaResponse } from "../../schemas";
import { TcommentRequest } from "../../interfaces";

const createCommentService = async (
  payload: TcommentRequest,
  tokenId: string,
  announcement: Announcement[]
) => {
  const commentRepo: Repository<Comment> = AppDataSource.getRepository(Comment);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const foundUser: User | null = await userRepo.findOneBy({ id: tokenId });

  const fullPayload: any = {
    ...payload,
    user: foundUser!,
    announcements: announcement,
  };

  const comment: Comment[] = commentRepo.create(fullPayload);

  await commentRepo.save(comment);

  return commentSchemaResponse.parse(comment);
};

export { createCommentService };
