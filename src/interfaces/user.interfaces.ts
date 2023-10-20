import { z } from "zod";
import { DeepPartial } from "typeorm";
import { userSchema, userSchemaRequest, userSchemaResponse, userSchemaUpdate } from "../schemas";

type Tuser = z.infer<typeof userSchema>;
type TUserRequest = z.infer<typeof userSchemaRequest>;
type TUserResponse = z.infer<typeof userSchemaResponse>;
type TUserUpdate = DeepPartial<TUserRequest>;

interface IToken {
  token: string;
}

export { TUserRequest, TUserResponse, TUserUpdate, IToken, Tuser };
