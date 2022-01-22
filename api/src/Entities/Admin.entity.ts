import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Admin {
   @PrimaryColumn()
   id: number

   @OneToOne(() => User, { primary: true, eager: true, cascade: true })
   @JoinColumn({name: 'id'})
   user: User
}