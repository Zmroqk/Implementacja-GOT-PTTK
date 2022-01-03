import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Badge } from "./Badge.entity";

@Entity()
export class BadgeType {
   @PrimaryGeneratedColumn()
   id: number

   @Column({length: 255})
   type: string

   @OneToMany(() => Badge, badge => badge.type)
   badges: Badge[]
}