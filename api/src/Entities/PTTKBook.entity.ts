import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Documentation } from "./Documentation.entity";
import { Tourist } from "./Tourist.entity";

@Entity()
export class PTTKBook {
   @PrimaryGeneratedColumn()
   id: number

   @OneToOne(() => Tourist, tourist => tourist.book)
   @JoinColumn()
   tourist: Tourist

   @OneToMany(() => Documentation, doc => doc.book)
   documentations: Documentation[]
}