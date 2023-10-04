import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const validateBody =
  (schema: ZodTypeAny) =>
  (request: Request, response: Response, next: NextFunction): void => {
    request.body = schema.parse(request.body);
    return next();
  };

export default validateBody;
