import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Segment } from "./Segment.entity";

@Entity()
export class Closure {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ type: 'date'})
   closedFrom: Date

   @Column({ type: 'date'})
   closedTo: Date

   

   @Column({length: 255, nullable: true })
   reason: string | null

   @ManyToOne(() => Segment, segment => segment.closures, { eager: true, cascade: ['insert', 'update']})
   segment: Segment
}