import { z } from "zod";
import { DeepPartial } from "typeorm";
import { imageSchema, imageSchemaRequest, imagesSchemaResponse } from "../schemas/image.schemas";

type TImage = z.infer<typeof imageSchema>;
type TImageRequest = z.infer<typeof imageSchemaRequest>;
type TImageResponse = z.infer<typeof imagesSchemaResponse>;
type TImages = DeepPartial<TImageRequest>;

export { TImage, TImageRequest, TImageResponse, TImages };
