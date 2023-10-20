import { z } from "zod";

const commentSchema = z.object({
  id: z.string(),
  comment: z.string().nonempty(),
  created_at: z.string().nonempty(),
});

const commentSchemaRequest = commentSchema.pick({
  comment: true,
});

const commentSchemaResponse = commentSchema;

const commentsSchemaResponse = commentSchemaResponse
  .extend({
    user: z.object({
      name: z.string(),
      id: z.string(),
    }),
    announcements: z.object({
      id: z.string(),
    }),
  })
  .array();

export const commentSchemaResponseWithUser = commentSchemaResponse.extend({
  user: z.object({
    name: z.string(),
    id: z.string(),
  }),
  announcements: z.object({
    id: z.string(),
  }),
});

export { commentSchema, commentSchemaResponse, commentSchemaRequest, commentsSchemaResponse };
