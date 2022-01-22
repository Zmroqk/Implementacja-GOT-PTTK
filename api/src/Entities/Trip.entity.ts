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

   @ManyToOne(() => TripPlan, plan => plan.trips, { eager: true, cascade: ['insert', 'update'] })
   plan: TripPlan

   @ManyToOne(() => Tourist, tourist => tourist.trips, { eager: true, cascade: ['insert', 'update'] })
   tourist: Tourist

   @ManyToOne(() => Badge, badge => badge.trips, { eager: true, cascade: ['insert', 'update'] })
   badge: Badge

   @OneToOne(() => Documentation, doc => doc.trip, { cascade: true })
   documentation: Documentation | null
}