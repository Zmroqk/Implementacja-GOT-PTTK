import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Admin {
   @OneToOne(() => User, { primary: true })
   @JoinColumn()
   user: User
}