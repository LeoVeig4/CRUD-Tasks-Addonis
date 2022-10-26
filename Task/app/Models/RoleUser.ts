import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Admin from './Admin'
import Student from './Student'

export default class RoleUser extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public role_id: number

  @belongsTo( () => Student, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public student: BelongsTo<typeof Student>

  @belongsTo( () => Admin, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public admin: BelongsTo<typeof Admin>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
