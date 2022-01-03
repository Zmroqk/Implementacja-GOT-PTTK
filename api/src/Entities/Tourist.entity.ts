import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable, Index, PrimaryColumn } from 'typeorm'
import { Application } from './Application.entity'
import { Badge } from './Badge.entity'
import { PTTKBook } from './PTTKBook.entity'
import { Trip } from './Trip.entity'
import { TripPlan } from './TripPlan.entity'
import { User } from './User.entity'
import { UserSegment } from './UserSegment.entity'

@Entity()
export class Tourist {
   @PrimaryColumn()
   id: number

   @OneToOne(() => User, { primary: true })
   @JoinColumn({ name: 'id' })
   user: User

   @Column()
   isDisabled: boolean

   @OneToMany(() => Application, application => application.applicant)
   applications: Application[]

   @OneToMany(() => UserSegment, segment => segment.author)
   createdSegments: UserSegment[]

   @OneToMany(() => TripPlan, plan => plan.author)
   createdPlans: TripPlan[]

   @OneToMany(() => Badge, badge => badge.tourist)
   badges: Badge[]

   @ManyToMany(() => TripPlan, plan => plan.tourists)
   @JoinTable()
   usedPlans: TripPlan[]

   @OneToMany(() => Trip, trip => trip.tourist)
   trips: Trip[]

   @OneToOne(() => PTTKBook, book => book.tourist)
   book: PTTKBook
}