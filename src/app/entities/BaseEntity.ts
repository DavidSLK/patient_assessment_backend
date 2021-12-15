import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

export class BaseEntity {
  @PrimaryColumn({
    type: 'varchar',
    nullable: false,
    name: 'id'
  })
  id: string

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at'
  })
  created_at: Date

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at'
  })
  updated_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}
