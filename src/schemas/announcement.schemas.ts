import { z } from "zod";
import { imageSchemaRequest, imagesSchemaResponse } from "./image.schemas";
import { userSchema } from "./user.schemas";
import { commentSchema } from "./comment.schemas";

const announcementSchema = z.object({
  id: z.string(),
  car_brand: z.string().max(15).nonempty(),
  model_car: z.string().max(15).nonempty(),
  fipe_price: z.number().min(1),
  price: z.number().min(1),
  year_built: z.number().min(1),
  mileage: z.number().min(1),
  description: z.string().nonempty(),
  color: z.string().max(15).nonempty(),
  type_of_fuel: z.string().max(15).nonempty(),
});

const announcementSchemaRequest = announcementSchema
  .omit({
    id: true,
  })
  .extend({
    images: imageSchemaRequest,
  });

const announcementSchemaResponse = announcementSchema.extend({
  user: userSchema.omit({
    cpf: true,
    dop: true,
    type_of_account: true,
    password: true,
  }),
  images: imagesSchemaResponse.array().nullish(),
  comments: commentSchema.array().nullish(),
});

const announcementSchemaUpdate = announcementSchemaRequest.partial();

const announcementsSchemaResponse = z.array(announcementSchemaResponse);

export {
  announcementSchema,
  announcementSchemaResponse,
  announcementSchemaRequest,
  announcementSchemaUpdate,
  announcementsSchemaResponse,
};
