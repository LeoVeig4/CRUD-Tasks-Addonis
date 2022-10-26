import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Admin from './Admin'
import Student from './Student'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs:null })
  public password: string



  @hasOne(() => Admin, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public admin: HasOne<typeof Admin>

  @hasOne(() => Student, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public student: HasOne<typeof Student>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
