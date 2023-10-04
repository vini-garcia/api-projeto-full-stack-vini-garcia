import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Comment } from "./Comment.entity";
import { Image } from "./Image.entity";

@Entity("announcements")
export class Announcement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 15 })
  car_brand: string;

  @Column({ length: 15 })
  model_car: string;

  @Column({ type: "integer" })
  fipe_price: number;

  @Column({ type: "integer" })
  price: number;

  @Column({ type: "integer" })
  year_built: number;

  @Column({ type: "integer" })
  mileage: number;

  @Column({ type: "text" })
  description: string;

  @Column({ length: 15 })
  color: string;

  @Column({ length: 15 })
  type_of_fuel: string;

  @ManyToOne(() => User, (u) => u.announcements, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => Comment, (c) => c.announcements)
  comments: Array<Comment>;

  @OneToMany(() => Image, (i) => i.announcement, { onDelete: "CASCADE", cascade: true })
  images: Array<Image>;
}
