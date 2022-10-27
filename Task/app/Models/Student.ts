import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Task from './Task'
import RoleUser from './RoleUserr'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @belongsTo( () => User, {
    localKey: 'user_id',
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @hasOne( () => RoleUser, {
    foreignKey: 'user_id',
    localKey: 'user_id'
  })
  public roleuser: HasOne<typeof RoleUser>

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
