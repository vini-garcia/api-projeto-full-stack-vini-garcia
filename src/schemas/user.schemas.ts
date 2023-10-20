import { z } from "zod";
import {
  addressSchemaRequest,
  addressSchemaResponse,
  addressSchemaUpdate,
} from "./address.schemas";

const userSchema = z.object({
  id: z.string(),
  name: z.string().max(150).nonempty(),
  email: z.string().max(100).email().nonempty(),
  cpf: z.string().max(11).nonempty(),
  phone_number: z.string().max(150).nonempty(),
  dob: z.string().max(10).nonempty(),
  description: z.string().nullish(),
  type_of_account: z.string().nonempty(),
  password: z.string().max(128).nonempty(),
});

const userSchemaRequest = userSchema
  .extend({
    address: addressSchemaRequest,
  })
  .omit({
    id: true,
  });

const userSchemaResponse = userSchema
  .extend({
    address: addressSchemaResponse,
  })
  .omit({
    password: true,
  });

const userSchemaUpdate = userSchema
  .partial()
  .omit({ id: true })
  .extend({ address: addressSchemaUpdate })
  .partial();

export { userSchema, userSchemaResponse, userSchemaRequest, userSchemaUpdate };
