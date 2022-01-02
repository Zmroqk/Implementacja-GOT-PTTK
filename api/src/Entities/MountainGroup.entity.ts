import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LeaderLegitimation } from "./LeaderLegitimation.entity";
import { MountainRange } from "./MountainRange.entity";

@Entity()
export class MountainGroup {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ length: 255 })
   name: string

   @ManyToMany(() => LeaderLegitimation, legitimation => legitimation.mountainGroups)
   @JoinTable()
   legitimations: LeaderLegitimation[]

   @OneToMany(() => MountainRange, range => range.mountainGroup)
   mountainRanges: MountainRange[]
}