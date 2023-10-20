import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement, Comment, User } from "../../entities";
import { TcommentRequest } from "../../interfaces";
import { commentSchemaResponseWithUser } from "../../schemas/comment.schemas";

const createCommentService = async (
  payload: TcommentRequest,
  tokenId: string,
  announcementId: string
) => {
  const commentRepo: Repository<Comment> = AppDataSource.getRepository(Comment);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const adsRepo: Repository<Announcement> = AppDataSource.getRepository(Announcement);

  const foundAd: Announcement | null = await adsRepo.findOneBy({ id: announcementId });

  const foundUser: User | null = await userRepo.findOneBy({ id: tokenId });

  const fullPayload: any = {
    ...payload,
    user: foundUser!,
    announcements: foundAd,
  };

  const comment: Comment[] = commentRepo.create(fullPayload);

  await commentRepo.save(comment);

  return commentSchemaResponseWithUser.parse(comment);
};

export { createCommentService };
