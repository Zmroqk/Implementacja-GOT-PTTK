import { Entity, Column, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { Application } from './Application.entity'
import { TripPlan } from './TripPlan.entity'
import { User } from './User.entity'
import { UserSegment } from './UserSegment.entity'

@Entity()
export class Tourist {
   @OneToOne(() => User, { primary: true })
   @JoinColumn()
   user: User

   @Column()
   isDisabled: boolean

   @OneToMany(() => Application, application => application.applicant)
   applications: Application[]

   @OneToMany(() => UserSegment, segment => segment.author)
   createdSegments: UserSegment[]

   @OneToMany(() => TripPlan, plan => plan.author)
   createdPlans: TripPlan[]

   @ManyToMany(() => TripPlan, plan => plan.tourists)
   @JoinTable()
   plans: TripPlan[]
}