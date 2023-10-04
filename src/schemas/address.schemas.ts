import { z } from "zod";

const addressSchema = z.object({
  id: z.string(),
  post_code: z.string().max(25).nonempty(),
  state: z.string().max(25).nonempty(),
  city: z.string().max(25).nonempty(),
  street_name: z.string().max(80).nonempty(),
  street_number: z.string().max(25).nonempty(),
  address_complement: z.string().nullish().optional(),
});

const addressSchemaRequest = addressSchema.omit({
  id: true,
});

const addressSchemaResponse = addressSchema;

const addressSchemaUpdate = addressSchemaRequest.partial();

export { addressSchema, addressSchemaRequest, addressSchemaResponse, addressSchemaUpdate };
