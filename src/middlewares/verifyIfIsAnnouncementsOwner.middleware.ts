import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Announcement } from "../entities";
import { AppError } from "../errors";

const verifyIfIsAnnouncementsOwner = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const repo = AppDataSource.getRepository(Announcement);

  const announcementId: string = request.params.id;
  const userId: string = response.locals.tokenId;

  const announcement = await repo.findOne({
    where: {
      id: announcementId,
    },
    relations: {
      user: true,
    },
  });

  if (!announcement) {
    throw new AppError("Announcement not found!", 404);
  }

  if (announcement.user.id !== userId) {
    throw new AppError("You don`t have permission!", 403);
  }

  return next();
};

export default verifyIfIsAnnouncementsOwner;
