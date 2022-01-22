import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tourist } from "./Tourist.entity";
import { Trip } from "./Trip.entity";
import { TripSegment } from "./TripSegment.entity";

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

   @ManyToMany(() => Tourist, tourist => tourist.usedPlans)
   tourists: Tourist[]

   @OneToMany(() => Trip, trip => trip.plan)
   trips: Trip[]

   @OneToMany(() => TripSegment, tripSegment => tripSegment.plan)
   tripSegments: TripSegment[]
}