import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Task from './Task'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public user_id: number

  @belongsTo( () => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: BelongsTo<typeof User>

  @hasMany (() => Task, {
    foreignKey: 'user_id',
    localKey: 'user_id'
  })
  public task: HasMany<typeof Task>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
