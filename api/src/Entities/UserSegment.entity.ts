import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tourist } from "./Tourist.entity";
import { TripSegment } from "./TripSegment.entity";

@Entity()
export class UserSegment {
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 255})
   description: string

   @Column()
   length: number

   @Column()
   gain: number

   @Column()
   points: number

   @ManyToOne(() => Tourist, tourist => tourist.createdSegments, { eager: true, cascade: ['insert', 'update']})
   author: Tourist

   @OneToMany(() => TripSegment, segment => segment.userSegment)
   tripSegments: TripSegment[]
}