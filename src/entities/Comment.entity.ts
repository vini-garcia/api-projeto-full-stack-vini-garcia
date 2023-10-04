import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Announcement } from "./Announcement.entity";

@Entity("comments")
export class Comment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  comment: string;

  @CreateDateColumn({ type: "date" })
  created_at: string;

  @ManyToOne(() => User, (u) => u.comments, { onDelete: "SET NULL" })
  user: User;

  @ManyToOne(() => Announcement, (a) => a.comments, { onDelete: "CASCADE" })
  announcements: Array<Announcement>;
}
