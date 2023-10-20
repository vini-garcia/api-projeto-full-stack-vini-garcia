import { Request, Response } from "express";
import {
  createCommentService,
  updateCommentService,
  destroyCommentService,
  getAllCommentsFromAnAnnouncementService,
} from "../services/comments";
import { TcommentSchemaResponseWithUser, TcommentUpdate } from "../interfaces";

const createNewComment = async (request: Request, response: Response): Promise<Response> => {
  const tokenId: string = response.locals.tokenId;
  const announcementId: any = request.params.id;

  const comment: TcommentSchemaResponseWithUser = await createCommentService(
    request.body,
    tokenId,
    announcementId
  );
  return response.status(201).json(comment);
};

const getAllCommentsFromAnAnnouncement = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const announcementId: string = request.params.id;

  const comments: any = await getAllCommentsFromAnAnnouncementService(announcementId);

  return response.status(200).json(comments);
};

const updateComment = async (request: Request, response: Response): Promise<Response> => {
  const commentId: string = request.params.id;

  const comment: TcommentUpdate = await updateCommentService(commentId, request.body);

  return response.status(200).json(comment);
};

const destroyComment = async (request: Request, response: Response): Promise<Response> => {
  const commentId: string = request.params.id;

  await destroyCommentService(commentId);

  return response.status(204).json();
};

export default {
  createNewComment,
  updateComment,
  getAllCommentsFromAnAnnouncement,
  destroyComment,
};
