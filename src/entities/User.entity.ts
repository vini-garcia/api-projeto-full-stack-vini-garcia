import { getRounds, hashSync } from "bcryptjs";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Announcement } from "./Announcement.entity";
import { Comment } from "./Comment.entity";
import { Address } from "./Address.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11 })
  phone_number: string;

  @Column({ type: "date" })
  dob: string;

  @Column({ type: "text", nullable: true })
  description?: string | undefined | null;

  @Column({ length: 128 })
  password: string;

  @Column({ length: 6, default: "buyer" })
  type_of_account: string;

  @OneToOne(() => Address, (a) => a.user, { cascade: true })
  address: Address;

  @OneToMany(() => Announcement, (a) => a.user)
  announcements: Array<Announcement>;

  @OneToMany(() => Comment, (c) => c.user)
  comments: Array<Comment>;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const hasRounds: number = getRounds(this.password);
    if (!hasRounds) {
      this.password = hashSync(this.password, 10);
    }
  }
}
