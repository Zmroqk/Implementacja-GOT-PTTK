import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MountainGroup } from "./MountainGroup.entity";
import { Waypoint } from "./Waypoint.entity";

@Entity()
export class MountainRange {
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 255})
   name: string

   @ManyToOne(() => MountainGroup, group => group.mountainRanges)
   mountainGroup: MountainGroup

   @OneToMany(() => Waypoint, waypoint => waypoint.mountainRange)
   waypoints: Waypoint[]
}