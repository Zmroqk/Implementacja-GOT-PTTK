import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./Segment.entity";
import { TripPlan } from "./TripPlan.entity";
import { UserSegment } from "./UserSegment.entity";

@Entity()
export class TripSegment {
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 255})
   direction: string

   @Column()
   consecutiveNumber: number

   @ManyToOne(() => TripPlan, plan => plan.tripSegments)
   plan: TripPlan

   @ManyToOne(() => Segment, segment => segment.tripSegments, { eager: true, cascade: ['insert', 'update'] })
   segment: Segment | null

   @ManyToOne(() => UserSegment, segment => segment.tripSegments, { eager: true, cascade: true })
   userSegment: UserSegment | null
}