import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./Segment.entity";

@Entity()
export class Closure {
   @PrimaryGeneratedColumn()
   id: number

   @Column({type: 'date'})
   closedFrom: Date

   @Column({type: 'date'})
   closedTo: Date

   @ManyToOne(() => Segment, segment => segment.closures)
   segment: Segment
}