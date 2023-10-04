import { Repository } from "typeorm";
import { Announcement } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TannouncementsResponse } from "../../interfaces";

const getAllAnnouncementsService = async (): Promise<TannouncementsResponse> => {
  const repo: Repository<Announcement> = AppDataSource.getRepository(Announcement);

  const announcements = await repo.find({
    relations: ["user", "images", "comments"],
  });

  return announcements;
};

export { getAllAnnouncementsService };
