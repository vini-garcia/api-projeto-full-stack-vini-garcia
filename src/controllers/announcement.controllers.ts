import { Request, Response } from "express";
import {
  createNewAnnouncementService,
  destroyAnnouncementService,
  getAllAnnouncementsService,
  getAnnouncementByIdService,
  updateAnnouncementService,
  getAllAnnouncementsFromUserService,
} from "../services/announcements";
import { TannouncementResponse, TannouncementsResponse } from "../interfaces";

const createNewAnnouncement = async (request: Request, response: Response): Promise<Response> => {
  const tokenId: string = response.locals.tokenId;
  const type_of_account: string = response.locals.type_of_account;

  const announcement: TannouncementResponse = await createNewAnnouncementService(
    request.body,
    tokenId,
    type_of_account
  );
  return response.status(201).json(announcement);
};

const getAllAnnouncements = async (request: Request, response: Response): Promise<Response> => {
  const announcements: TannouncementsResponse = await getAllAnnouncementsService();

  return response.status(200).json(announcements);
};

const getAnnouncementById = async (request: Request, response: Response) => {
  const announcementId: string = request.params.id;

  const announcement: TannouncementResponse = await getAnnouncementByIdService(announcementId);

  return response.json(announcement);
};

const getAllAnnouncementsFromUser = async (request: Request, response: Response) => {
  const userId: string = request.params.id;

  const announcements: TannouncementsResponse = await getAllAnnouncementsFromUserService(userId);

  return response.json(announcements);
};

const updateAnnouncement = async (request: Request, response: Response): Promise<Response> => {
  const announcementId: string = request.params.id;

  const announcement: TannouncementResponse = await updateAnnouncementService(
    request.body,
    announcementId
  );

  return response.status(200).json(announcement);
};

const destroyAnnouncement = async (request: Request, response: Response): Promise<Response> => {
  await destroyAnnouncementService(response.locals.announcement);

  return response.status(204).json();
};

export default {
  createNewAnnouncement,
  updateAnnouncement,
  destroyAnnouncement,
  getAnnouncementById,
  getAllAnnouncements,
  getAllAnnouncementsFromUser,
};
