import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Announcement } from "./Announcement.entity";

@Entity("images")
export class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 250, nullable: true })
  gallery_image_url: string;

  @Column({ length: 250, nullable: true })
  cover_image_url: string;

  @ManyToOne(() => Announcement, (a) => a.images, { onDelete: "CASCADE" })
  announcement: Announcement;
}
