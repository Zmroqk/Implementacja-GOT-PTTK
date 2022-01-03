import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Badge } from "./Badge.entity";

@Entity()
export class BadgeLevel {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ length: 255 })
   level: string

   @OneToMany(() => Badge, badge => badge.level)
   badges: Badge[]
}