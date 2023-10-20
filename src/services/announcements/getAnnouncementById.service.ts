import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Announcement } from "../../entities";
import { AppError } from "../../errors";
import { announcementSchemaResponse } from "../../schemas";
import { TannouncementResponse } from "../../interfaces";

const getAnnouncementByIdService = async (
  announcementId: string
): Promise<TannouncementResponse> => {
  const repo: Repository<Announcement> = AppDataSource.getRepository(Announcement);

  const announcement = await repo.findOne({
    where: {
      id: announcementId,
    },
    relations: {
      images: true,
      user: true,
      comments: true,
    },
  });

  if (!announcement) {
    throw new AppError("Announcement not found!", 404);
  }

  return announcementSchemaResponse.parse(announcement);
};

export { getAnnouncementByIdService };
