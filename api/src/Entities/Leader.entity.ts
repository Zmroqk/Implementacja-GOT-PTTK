import { Column, Entity, JoinColumn, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Application } from "./Application.entity";
import { Documentation } from "./Documentation.entity";
import { LeaderLegitimation } from "./LeaderLegitimation.entity";
import { Tourist } from "./Tourist.entity";

@Entity()
export class Leader {
   @PrimaryColumn()
   id: number

   @OneToOne(() => Tourist, { primary: true, eager: true, cascade: true })
   @JoinColumn({name: 'id'})
   tourist: Tourist

   @Column({ type: 'date'})
   nominateDate: Date

   @ManyToMany(() => Application)
   applications: Application[]

   @OneToOne(() => LeaderLegitimation, legitimation => legitimation.leader, { eager: true, cascade: true })
   legitimation: LeaderLegitimation

   @OneToMany(() => Documentation, doc => doc.checker)
   checkedDocumentations: Documentation[]
}