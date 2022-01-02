import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tourist } from "./Tourist.entity";

@Entity()
export class TripPlan {
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 2000})
   description: string | null

   @Column()
   points: number

   @Column()
   implicit: boolean | null

   @ManyToOne(() => Tourist, tourist => tourist.createdPlans)
   author: Tourist

   @ManyToMany(() => Tourist, tourist => tourist.plans)
   tourists: Tourist[]
}