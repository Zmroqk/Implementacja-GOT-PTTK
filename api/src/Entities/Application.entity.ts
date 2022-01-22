import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationType } from "./ApplicationType.entity";
import { ApplicationStatus } from "./Enums/ApplicationStatus.enum";
import { Leader } from "./Leader.entity";
import { MountainGroup } from "./MountainGroup.entity";
import { Tourist } from "./Tourist.entity";
import { User } from "./User.entity";

@Entity()
export class Application {
   @PrimaryGeneratedColumn()
   id: number

   @ManyToOne(() => ApplicationType, type => type.applications)
   type: ApplicationType

   @Column({ length: 255 })
   body: string

   // CHANGE Added status for application
   @Column({type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.Created})
   status: ApplicationStatus

   // CHANGE Added requested mountain groups
   @ManyToMany(() => MountainGroup, mountainGroup => mountainGroup.applications)
   @JoinTable()
   requestedMountainGroups: MountainGroup[]

   @ManyToOne(() => Tourist, tourist => tourist.applications)
   applicant: Tourist

   @ManyToMany(() => Leader)
   @JoinTable()
   leaders: Leader[]
}