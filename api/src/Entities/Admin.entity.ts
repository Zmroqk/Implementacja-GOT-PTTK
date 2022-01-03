import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Admin {
   @PrimaryColumn()
   id: number

   @OneToOne(() => User, { primary: true })
   @JoinColumn({name: 'id'})
   user: User
}