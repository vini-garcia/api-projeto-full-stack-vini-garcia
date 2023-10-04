import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import { userSchemaResponse } from "../../schemas/user.schemas";
import { TUserResponse, TUserUpdate, Tuser } from "../../interfaces";

const updateUserService = async (
  foundUser: Tuser,
  payload: TUserUpdate
): Promise<TUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const userDataRepo: User | null = await userRepo.findOne({
    where: {
      id: foundUser.id,
    },
    relations: ["address"],
  });

  const payloadAddress: Address = addressRepo.create({
    ...userDataRepo!.address,
    ...payload.address,
  });

  const user: User = userRepo.create({
    ...userDataRepo!,
    ...payload,
    address: payloadAddress,
  });

  await userRepo.save(user);

  return userSchemaResponse.parse(user);
};

export { updateUserService };
