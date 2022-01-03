import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Badge } from "./Badge.entity";
import { Documentation } from "./Documentation.entity";
import { Tourist } from "./Tourist.entity";
import { TripPlan } from "./TripPlan.entity";

@Entity()
export class Trip {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   points: number

   @Column({type: 'date'})
   startDate: Date

   @Column({type: 'date'})
   endDate: Date

   @ManyToOne(() => TripPlan, plan => plan.trips)
   plan: TripPlan

   @ManyToOne(() => Tourist, tourist => tourist.trips)
   tourist: Tourist

   @ManyToOne(() => Badge, badge => badge.trips)
   badge: Badge

   @OneToOne(() => Documentation, doc => doc.trip)
   documentation: Documentation | null
}