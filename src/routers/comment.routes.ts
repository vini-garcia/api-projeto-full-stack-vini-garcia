import { Router } from "express";
import middlewares from "../middlewares";
import commentControllers from "../controllers/comment.controllers";
import { commentSchemaRequest } from "../schemas";

const commentRoutes: Router = Router();

commentRoutes.get("/:id", commentControllers.getAllCommentsFromAnAnnouncement);

commentRoutes.use("", middlewares.verifyIfTokenIsValid);

commentRoutes.post(
  "/:id",
  middlewares.verifyIfTokenIsValid,
  middlewares.verifyIfAnnouncementIdExists,
  middlewares.validateBody(commentSchemaRequest),
  commentControllers.createNewComment
);

commentRoutes.patch(
  "/:id",
  middlewares.verifyIfIsCommentsOwner,
  middlewares.validateBody(commentSchemaRequest),
  commentControllers.updateComment
);
commentRoutes.delete(
  "/:id",
  middlewares.verifyIfIsCommentsOwner,
  commentControllers.destroyComment
);

export default commentRoutes;
