import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm'

@Entity()
export class User {
   @PrimaryGeneratedColumn()
   id: number

   @Column({ length: 255 })
   name: string

   @Column({ length: 255 })
   surname: string

   @Column({ length: 50 })
   login: string

   @Column({ length: 255 })
   passwordHash: string

   @Column({ length: 255 })
   identityNumber: string
}