import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApplicationType } from "./ApplicationType.entity";
import { Leader } from "./Leader.entity";
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

   @ManyToOne(() => Tourist, tourist => tourist.applications)
   applicant: Tourist

   @ManyToMany(() => Leader)
   @JoinTable()
   leaders: Leader[]
}