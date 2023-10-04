import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, User } from "../../entities";
import { AppError } from "../../errors";
import { userSchemaResponse } from "../../schemas/user.schemas";
import { TUserRequest, TUserResponse } from "../../interfaces";

const createNewUserService = async (payload: TUserRequest): Promise<TUserResponse> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);

  const findEmailUser: User | null = await userRepo.findOne({
    where: {
      email: payload.email,
    },
  });

  if (findEmailUser) {
    throw new AppError("User already exists!", 409);
  }

  const findCPFUser: User | null = await userRepo.findOne({
    where: {
      cpf: payload.cpf,
    },
  });

  if (findCPFUser) {
    throw new AppError("User already exists!", 409);
  }

  const findPhoneNumberUser: User | null = await userRepo.findOne({
    where: {
      phone_number: payload.phone_number,
    },
  });

  if (findPhoneNumberUser) {
    throw new AppError("User already exists!", 409);
  }

  const payloadAddress: Address = addressRepo.create(payload.address);

  const userData = {
    ...payload,
    address: payloadAddress,
  };

  const user = userRepo.create(userData);

  await userRepo.save(user);

  return userSchemaResponse.parse(user);
};

export { createNewUserService };
