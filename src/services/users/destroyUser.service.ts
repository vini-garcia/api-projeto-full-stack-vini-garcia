import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";

const destroyUserService = async (user: User): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  await userRepo.remove(user);
};

export { destroyUserService };
