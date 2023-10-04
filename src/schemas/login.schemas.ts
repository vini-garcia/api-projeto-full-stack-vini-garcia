import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().max(128),
});

export { loginSchema };
