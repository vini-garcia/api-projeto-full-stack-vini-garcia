import { z } from "zod";
import {
  commentSchema,
  commentSchemaRequest,
  commentSchemaResponse,
  commentsSchemaResponse,
} from "../schemas";
import { DeepPartial } from "typeorm";
import { commentSchemaResponseWithUser } from "../schemas/comment.schemas";

type Tcomment = z.infer<typeof commentSchema>;
type TcommentSchemaResponseWithUser = z.infer<typeof commentSchemaResponseWithUser>;
type TcommentsResponse = z.infer<typeof commentsSchemaResponse>;
type TcommentRequest = z.infer<typeof commentSchemaRequest>;
type TcommentResponse = z.infer<typeof commentSchemaResponse>;
type TcommentUpdate = DeepPartial<Tcomment>;

export {
  Tcomment,
  TcommentsResponse,
  TcommentRequest,
  TcommentResponse,
  TcommentSchemaResponseWithUser,
  TcommentUpdate,
};
