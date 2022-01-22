import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Closure } from "./Closure.entity";
import { HikingTrail } from "./HikingTrail.entity";
import { TripSegment } from "./TripSegment.entity";
import { Waypoint } from "./Waypoint.entity";

@Entity()
export class Segment {
   @PrimaryGeneratedColumn()
   id: number

   @Column()
   points: number | null

   @Column()
   pointsReverse: number | null

   @Column({length: 255})
   via: string | null

   @Column()
   inPoland: boolean

   @ManyToOne(() => Waypoint, point => point.segments, { eager: true, cascade: ['insert', 'update'] })
   startPoint: Waypoint

   @ManyToOne(() => Waypoint, point => point.segments, { eager: true, cascade: ['insert', 'update'] })
   endPoint: Waypoint

   @ManyToMany(() => HikingTrail, trail => trail.segments, { cascade: ['insert', 'update'] })
   hikingTrails: HikingTrail[]

   @OneToMany(() => Closure, closure => closure.segment)
   closures: Closure[]

   @OneToMany(() => TripSegment, trip => trip.segment)
   tripSegments: TripSegment[]
}