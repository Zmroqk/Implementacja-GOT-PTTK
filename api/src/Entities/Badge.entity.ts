import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BadgeLevel } from "./BadgeLevel.entity";
import { BadgeType } from "./BadgeType.entity";
import { Tourist } from "./Tourist.entity";
import { Trip } from "./Trip.entity";

@Entity()
export class Badge {
   @PrimaryGeneratedColumn()
   id: number

   @Column({type: 'date', nullable: true})
   receivedDate: Date | null

   @OneToMany(() => Trip, trip => trip.badge)
   trips: Trip[]

   @ManyToOne(() => BadgeType, type => type.badges, { eager: true, cascade: ['insert', 'update'] })
   type: BadgeType

   @ManyToOne(() => BadgeLevel, level => level.badges, { eager: true, cascade: ['insert', 'update'] })
   level: BadgeLevel

   @ManyToOne(() => Tourist, tourist => tourist.badges, { nullable: true, eager: true, cascade: ['insert', 'update'] })
   @JoinColumn([{name: "touristId", referencedColumnName: "id"}])
   tourist: Tourist

   @Column({nullable: true})
   touristId: number
}