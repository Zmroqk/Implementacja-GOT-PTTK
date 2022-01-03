import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Documentation } from "./Documentation.entity";

@Entity()
export class DocumentationProve {
   @PrimaryGeneratedColumn()
   id: number

   @Column({type: 'blob'})
   blob: any | null

   @ManyToOne(() => Documentation, doc => doc.proves)
   documentation: Documentation
}