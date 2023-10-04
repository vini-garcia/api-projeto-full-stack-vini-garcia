import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  announcementSchema,
  announcementSchemaRequest,
  announcementsSchemaResponse,
} from "../schemas";

type Tannouncement = z.infer<typeof announcementSchema>;
type TannouncementRequest = z.infer<typeof announcementSchemaRequest>;
type TannouncementResponse = z.infer<typeof announcementSchema>;
type TannouncementsResponse = z.infer<typeof announcementsSchemaResponse>;
type TannouncementUpdateRequest = DeepPartial<TannouncementRequest>;

export {
  Tannouncement,
  TannouncementRequest,
  TannouncementResponse,
  TannouncementsResponse,
  TannouncementUpdateRequest,
};
