import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import RoleUser from './RoleUser'

export default class Admin extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @hasOne( () => RoleUser, {
    foreignKey: 'user_id',
    localKey: 'user_id'
  })
  public roleuser: HasOne<typeof RoleUser>

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'user_id'
  })
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
