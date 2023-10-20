import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Tannouncement, TannouncementRequest, TannouncementResponse } from "../../interfaces";
import { AppError } from "../../errors";
import { Announcement, Image, User } from "../../entities";
import { announcementSchemaResponse } from "../../schemas";

const createNewAnnouncementService = async (
  { images, ...payload }: TannouncementRequest,
  tokenId: string,
  type_of_account: string
): Promise<TannouncementResponse> => {
  if (type_of_account === "buyer") {
    throw new AppError("You need to be a seller to register ads", 403);
  }

  const announcementRepo: Repository<Announcement> = AppDataSource.getRepository(Announcement);
  const imageRepo: Repository<Image> = AppDataSource.getRepository(Image);
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const imageData = images.gallery_image_url!;
  // const cover_image_url = images.cover_image_url!;

  const foundUser: User | null = await userRepo.findOneBy({ id: tokenId });

  const payloadWithUser = {
    ...payload,
    user: foundUser!,
  };

  const announcement: Tannouncement = announcementRepo.create(payloadWithUser);

  await announcementRepo.save(announcement);

  // const coverImageWithId: any = {
  //   // cover_image_url,
  //   gallery_image_url: null,
  //   announcement: announcement.id,
  // };

  // await imageRepo.save(coverImageWithId);

  for (const gallery_image_url of imageData) {
    const galleryImageWithId: any = {
      gallery_image_url,
      cover_image_url: null,
      announcement: announcement.id,
    };
    await imageRepo.save(galleryImageWithId);
  }

  const fullAnnouncement = await announcementRepo.findOne({
    where: {
      id: announcement.id,
    },
    relations: ["user", "images"],
  });

  return announcementSchemaResponse.parse(fullAnnouncement);
};

export { createNewAnnouncementService };
