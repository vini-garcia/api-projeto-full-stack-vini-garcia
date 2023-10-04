import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Announcement } from "../../entities";

const destroyAnnouncementService = async (id: string): Promise<void> => {
  const repo: Repository<Announcement> = AppDataSource.getRepository(Announcement);
  const announcement: Announcement | null = await repo.findOneBy({ id });

  if (!announcement) {
    throw new AppError("Announcement not found!", 404);
  }

  await repo.remove(announcement);
};

export { destroyAnnouncementService };
