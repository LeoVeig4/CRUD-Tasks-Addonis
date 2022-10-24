import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string({}, [
        rules.unique({table: 'users', column: 'username'})
    ]),
    password: schema.string({}, [
        rules.minLength(4)
    ])
  })

  public messages = {
    'minLength': 'The array must have minimum of {{ options.minLength }} items',
  }
}