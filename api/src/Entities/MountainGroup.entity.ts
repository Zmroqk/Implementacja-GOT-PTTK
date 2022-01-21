import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Application } from "./Application.entity";
import { LeaderLegitimation } from "./LeaderLegitimation.entity";
import { MountainRange } from "./MountainRange.entity";

@Entity()
export class MountainGroup {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ length: 255 })
   name: string

   @ManyToMany(() => LeaderLegitimation, legitimation => legitimation.mountainGroups)
   legitimations: LeaderLegitimation[]

   @OneToMany(() => MountainRange, range => range.mountainGroup)
   mountainRanges: MountainRange[]

   // CHANGE added connection to applications
   @ManyToMany(() => Application, application => application.requestedMountainGroups)
   applications: Application[]
}