import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("Addresses")
export class Address {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 8 })
  post_code: string;

  @Column({ length: 25 })
  state: string;

  @Column({ length: 25 })
  city: string;

  @Column({ length: 80 })
  street_name: string;

  @Column({ length: 5 })
  street_number: string;

  @Column({ type: "varchar", length: 50, nullable: true })
  address_complement?: string | undefined | null;

  @OneToOne(() => User, (u) => u.address, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;
}
