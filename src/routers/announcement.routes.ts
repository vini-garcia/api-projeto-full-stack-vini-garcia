import { Router } from "express";
import { announcementControllers } from "../controllers";
import middlewares from "../middlewares";
import { announcementSchemaRequest, announcementSchemaUpdate } from "../schemas";

const announcementRoutes: Router = Router();

announcementRoutes.get("", announcementControllers.getAllAnnouncements);
announcementRoutes.get("/:id", announcementControllers.getAnnouncementById);
announcementRoutes.get("/user/:id", announcementControllers.getAllAnnouncementsFromUser);

announcementRoutes.use("", middlewares.verifyIfTokenIsValid);

announcementRoutes.post(
  "",
  middlewares.verifyIfUserIdExists,
  middlewares.validateBody(announcementSchemaRequest),
  announcementControllers.createNewAnnouncement
);

announcementRoutes.patch(
  "/:id",
  middlewares.validateBody(announcementSchemaUpdate),
  middlewares.verifyIfIsAnnouncementsOwner,
  announcementControllers.updateAnnouncement
);
announcementRoutes.delete(
  "/:id",
  middlewares.verifyIfIsAnnouncementsOwner,
  announcementControllers.destroyAnnouncement
);

export default announcementRoutes;
