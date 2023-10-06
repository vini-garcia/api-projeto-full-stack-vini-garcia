import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { verify } from "jsonwebtoken";

const verifyIfTokenIsValid = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const tokenRequest: string | undefined = request.headers["authorization"];

  if (!tokenRequest) {
    throw new AppError("Missing bearer token", 401);
  }

  const token: string = tokenRequest.split(" ")[1];

  verify(token, process.env.SECRET_KEY || "senha", (error: any, decoded: any) => {
    if (error) {
      throw new AppError("Invalid token!", 401);
    }

    response.locals.tokenId = decoded.sub;

    response.locals.type_of_account = decoded.type_of_account;
  });

  return next();
};

export default verifyIfTokenIsValid;
