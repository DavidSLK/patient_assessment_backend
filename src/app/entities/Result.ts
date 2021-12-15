import { Entity, Column, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { User } from './User'

@Entity('results')
export class Result extends BaseEntity {
  @Column({
    type: 'text',
    nullable: false,
    name: 'answers'
  })
  answers: string

  @ManyToOne(() => User, user => user.results, { onDelete: 'CASCADE' })
  user: User
}
