import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { HikingTrail } from "./HikingTrail.entity";

@Entity()
export class Color{
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 255})
   color: string

   @OneToMany(() => HikingTrail, trail => trail.color)
   hikingTrails: Color[]
}