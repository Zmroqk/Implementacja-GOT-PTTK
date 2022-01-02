import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Application } from "./Application.entity";

@Entity()
export class ApplicationType {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ length: 255 })
   type: string

   @OneToMany(() => Application, application => application.type)
   applications: Application[]
}