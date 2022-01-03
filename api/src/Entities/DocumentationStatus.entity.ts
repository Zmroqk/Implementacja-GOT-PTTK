import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Documentation } from "./Documentation.entity"

@Entity()
export class DocumentationStatus {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ length: 255 })
   status: string

   @OneToMany(() => Documentation, doc => doc.status)
   documents: Documentation[]
}