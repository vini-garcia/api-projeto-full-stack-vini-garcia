import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement, User } from "../../entities";
import { AppError } from "../../errors";
import { announcementsSchemaResponse } from "../../schemas";
import { TannouncementsResponse } from "../../interfaces";

const getAllAnnouncementsFromUserService = async (
  userId: string
): Promise<TannouncementsResponse> => {
  const repo: Repository<Announcement> = AppDataSource.getRepository(Announcement);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const foundUser: User | null = await userRepo.findOne({
    where: {
      id: userId,
    },
  });

  if (!foundUser) {
    throw new AppError("User not found!", 404);
  }

  const announcements: Announcement[] = await repo.find({
    where: {
      user: { id: userId },
    },
    relations: ["user", "images", "comments"],
  });

  if (!announcements) {
    throw new AppError("Announcement not found!", 404);
  }

  return announcementsSchemaResponse.parse(announcements);
};

export { getAllAnnouncementsFromUserService };
