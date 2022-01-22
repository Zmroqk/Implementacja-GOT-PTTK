import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Leader } from "./Leader.entity";
import { MountainGroup } from "./MountainGroup.entity";

@Entity()
export class LeaderLegitimation {
   @PrimaryGeneratedColumn()
   id: number

   @OneToOne(() => Leader, leader => leader.legitimation)
   @JoinColumn()
   leader: Leader

   @ManyToMany(() => MountainGroup, mountainGroup => mountainGroup.legitimations, { cascade: ['insert', 'update' ]})
   @JoinTable()
   mountainGroups: MountainGroup[]
}