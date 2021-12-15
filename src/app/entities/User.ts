import {
  Column,
  Entity,
  BeforeInsert,
  BeforeUpdate,
  OneToMany
} from 'typeorm'

import bcrypt from 'bcrypt'

import { BaseEntity } from './BaseEntity'
import { Result } from './Result'

@Entity('users')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    name: 'fullname'
  })
  fullname: string

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    name: 'document'
  })
  document: string

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
    name: 'email'
  })
  email: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'password'
  })
  password: string

  @Column({
    type: 'date',
    nullable: false,
    name: 'birth_date'
  })
  birth_date: Date

  @Column({
    type: 'varchar',
    nullable: false,
    default: false,
    name: 'isRootUser'
  })
  isRootUser: boolean

  @OneToMany(() => Result, result => result.user)
  results: Result[]

  @BeforeInsert()
  @BeforeUpdate()
  private hashData () {
    this.password = bcrypt.hashSync(this.password, 8)
  }
}
