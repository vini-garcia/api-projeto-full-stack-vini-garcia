import { compare } from "bcryptjs";
import { IToken, TLoginRequest } from "../../interfaces";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../errors";

const loginUserService = async (payload: TLoginRequest): Promise<IToken> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const payloadEmail: string = payload.email;

  const user: User | null = await userRepo.findOneBy({
    email: payloadEmail,
  });

  const passwordMatch: boolean = await compare(payload.password, user!.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials!", 401);
  }

  const token: string = sign(
    { type_of_account: user!.type_of_account },
    String(process.env.SECRET_KEY || "senha"),
    {
      expiresIn: String(process.env.EXPIRES_IN || 999999999),
      subject: String(user!.id),
    }
  );

  return { token };
};

export { loginUserService };
