import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TannouncementResponse, TannouncementUpdateRequest } from "../../interfaces";
import { Announcement } from "../../entities";
import { AppError } from "../../errors";
import { announcementSchemaResponse } from "../../schemas";

const updateAnnouncementService = async (
  payload: TannouncementUpdateRequest,
  id: string
): Promise<TannouncementResponse> => {
  const announcementRepo: Repository<Announcement> = AppDataSource.getRepository(Announcement);
  const oldAnnouncement: any | null = await announcementRepo.findOne({
    where: {
      id,
    },
    relations: {
      images: true,
      user: true,
      comments: true,
    },
  });

  if (!oldAnnouncement || oldAnnouncement.id !== id) {
    throw new AppError("Announcement not found", 404);
  }

  const newAnnouncement = announcementRepo.create({
    ...(oldAnnouncement || {}),
    ...payload,
  });

  await announcementRepo.save(newAnnouncement);

  return announcementSchemaResponse.parse(newAnnouncement);
};

export { updateAnnouncementService };
