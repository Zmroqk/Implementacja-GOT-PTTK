import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Color } from "./Color.entity";
import { Segment } from "./Segment.entity";

@Entity()
export class HikingTrail {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   length: number | null

   @ManyToMany(() => Segment, segment => segment.hikingTrails)
   @JoinTable()
   segments: Segment[]

   @ManyToOne(() => Color, color => color.hikingTrails)
   color: Color
}