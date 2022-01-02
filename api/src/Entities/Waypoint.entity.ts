import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MountainRange } from "./MountainRange.entity";
import { Segment } from "./Segment.entity";

@Entity()
export class Waypoint {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ length: 255})
   name: string

   @Column({ type: 'float' })
   height: number | null

   @ManyToOne(() => MountainRange, range => range.waypoints)
   mountainRange: MountainRange

   @OneToMany(() => Segment, segment => segment.startPoint)
   @OneToMany(() => Segment, segment => segment.endPoint)
   segments: Segment[]
}