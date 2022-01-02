import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from "typeorm";
import { Application } from "./Application.entity";
import { LeaderLegitimation } from "./LeaderLegitimation.entity";
import { Tourist } from "./Tourist.entity";

@Entity()
export class Leader {
   @OneToOne(() => Tourist, { primary: true })
   @JoinColumn()
   tourist: Tourist

   @Column({ type: 'date'})
   nominateDate: Date

   @ManyToMany(() => Application)
   applications: Application[]

   @OneToOne(() => LeaderLegitimation, legitimation => legitimation.leader)
   @JoinColumn()
   legitimation: LeaderLegitimation
}