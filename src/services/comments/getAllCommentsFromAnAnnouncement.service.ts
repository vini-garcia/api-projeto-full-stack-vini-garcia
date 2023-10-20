import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement, Comment } from "../../entities";
import { AppError } from "../../errors";
import { commentsSchemaResponse } from "../../schemas";

const getAllCommentsFromAnAnnouncementService = async (id: string) => {
  const commentRepo: Repository<Comment> = AppDataSource.getRepository(Comment);
  const announcementRepo: Repository<Announcement> = AppDataSource.getRepository(Announcement);
  const announcement: Announcement | null = await announcementRepo.findOneBy({ id });

  if (!announcement) {
    throw new AppError("Announcement not found", 404);
  }

  const comments: Comment[] = await commentRepo.find({
    where: {
      announcements: { id: id },
    },
    relations: {
      user: true,
      announcements: true,
    },
  });

  return commentsSchemaResponse.parse(comments);
};

export { getAllCommentsFromAnAnnouncementService };
