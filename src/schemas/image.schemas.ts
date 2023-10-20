import { z } from "zod";

const imageSchema = z.object({
  id: z.string(),
  gallery_image_url: z.string().max(250).optional().nullish().array(),
  cover_image_url: z.string().max(250).optional().nullish(),
});

const imageSchemaRequest = imageSchema.omit({ id: true, cover_image_url: true });

const imagesSchemaResponse = z.object({
  id: z.string(),
  gallery_image_url: z.string().nullable(),
  // cover_image_url: z.string().nullable(),
});

export { imageSchemaRequest, imagesSchemaResponse, imageSchema };
