import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import { userSchemaResponse } from "../../schemas/user.schemas";
import { TUserResponse, TUserUpdate, Tuser } from "../../interfaces";
import { AppError } from "../../errors";

const updateUserService = async (
  foundUser: Tuser,
  payload: TUserUpdate
): Promise<TUserResponse> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const oldUserData = await userRepository.findOne({
    where: {
      id: foundUser.id,
    },
    relations: ["address"],
  });

  if (!oldUserData) {
    throw new AppError("User dosnt exists", 409);
  }

  const newAddress = addressRepo.create({
    ...oldUserData.address,
    ...payload.address,
  });

  const user = userRepository.create({
    ...oldUserData,
    ...payload,
    address: newAddress,
  });

  await userRepository.save(user);

  const updatedUser = userSchemaResponse.parse(user);

  return updatedUser;
};

export { updateUserService };
