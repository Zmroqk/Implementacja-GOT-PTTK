import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { DocumentationProve } from "./DocumentationProve.entity";
import { DocumentationStatus } from "./DocumentationStatus.entity";
import { Leader } from "./Leader.entity";
import { PTTKBook } from "./PTTKBook.entity";
import { Trip } from "./Trip.entity";

@Entity()
export class Documentation {
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 1000})
   description: string | null

   @ManyToOne(() => Leader, leader => leader.checkedDocumentations, { eager: true, cascade: ['insert', 'update']})
   checker: Leader | null

   @OneToOne(() => Trip, trip => trip.documentation, { eager: true, cascade: ['insert', 'update']})
   @JoinColumn()
   trip: Trip

   @ManyToOne(() => PTTKBook, book => book.documentations, { eager: true, cascade: ['insert', 'update']})
   book: PTTKBook

   @ManyToOne(() => DocumentationStatus, status => status.documents, { eager: true, cascade: ['insert', 'update']})
   status: DocumentationStatus

   @OneToMany(() => DocumentationProve, prove => prove.documentation, { eager: true, cascade: true })
   proves: DocumentationProve[]
}