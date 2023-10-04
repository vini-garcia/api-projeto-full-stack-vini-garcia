import { z } from "zod";
import { announcementSchema } from "./announcement.schemas";
import { userSchema } from "./user.schemas";

const commentSchema = z.object({
  id: z.string(),
  comment: z.string().nonempty(),
  created_at: z.string().nonempty(),
});

const commentSchemaRequest = commentSchema.pick({
  comment: true,
});

const commentSchemaResponse = commentSchema;

const commentsSchemaResponse = z.array(commentSchemaResponse);

export { commentSchema, commentSchemaResponse, commentSchemaRequest, commentsSchemaResponse };
