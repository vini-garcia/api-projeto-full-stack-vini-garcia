import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Announcement } from "../entities";
import { AppError } from "../errors";
import { Repository } from "typeorm";

const verifyIfAnnouncementIdExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const announcementId: string = request.params.adsIdid;

  const repo: Repository<Announcement> = AppDataSource.getRepository(Announcement);
  const announcement: Announcement | null = await repo.findOneBy({ id: announcementId });

  if (!announcement) throw new AppError("Announcement not found!", 404);

  response.locals = { ...response.locals, announcement };

  return next();
};

export default verifyIfAnnouncementIdExists;
