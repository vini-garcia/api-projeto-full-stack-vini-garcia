import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { userSchemaResponse } from "../../schemas/user.schemas";
import { TUserResponse } from "../../interfaces";

const getUserService = async (id: string): Promise<TUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOne({
    where: {
      id: id,
    },
    relations: ["address"],
  });

  return userSchemaResponse.parse(user);
};

export { getUserService };
