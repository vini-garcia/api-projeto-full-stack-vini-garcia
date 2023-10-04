import handleError from "./handleError.middleware";
import validateBody from "./validateBody.middleware";
import verifyIfUserIdExists from "./verifyIfUserIdExists.middleware";
import verifyIfTokenIsValid from "./verifyIfTokenIsValid.middleware";
import verifyIfAnnouncementIdExists from "./verifyIfAnnouncementIdExists.middleware";
import verifyIfCommentIdExists from "./verifyIfCommentIdExists.middleware";
import verifyIfEmailExists from "./verifyIfEmailExists.middleware";
import verifyIfIsAnnouncementsOwner from "./verifyIfIsAnnouncementsOwner.middleware";
import verifyIfIsCommentsOwner from "./verifyIfIsCommentsOwner.middleware";
import verifyIfIsUsersOwner from "./verifyIfIsUsersOwner";

export default {
  handleError,
  validateBody,
  verifyIfUserIdExists,
  verifyIfTokenIsValid,
  verifyIfAnnouncementIdExists,
  verifyIfCommentIdExists,
  verifyIfEmailExists,
  verifyIfIsAnnouncementsOwner,
  verifyIfIsCommentsOwner,
  verifyIfIsUsersOwner,
};
