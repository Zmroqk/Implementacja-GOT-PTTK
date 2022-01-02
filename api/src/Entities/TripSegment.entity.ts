import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./Segment.entity";
import { UserSegment } from "./UserSegment.entity";

@Entity()
export class TripSegment {
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 255})
   direction: string

   @Column()
   consecutiveNumber: number

   @ManyToOne(() => Segment, segment => segment.tripSegments)
   segment: Segment | null

   @ManyToOne(() => UserSegment, segment => segment.tripSegments)
   userSegment: UserSegment | null
}