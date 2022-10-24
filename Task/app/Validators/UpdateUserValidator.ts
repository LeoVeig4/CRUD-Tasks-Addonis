import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    username: schema.string.optional({}, [
        rules.unique({table: 'users', column: 'username'})
    ]),
    password: schema.string.optional({}, [
        rules.minLength(4)
    ])
  })

  public messages = {
    'minLength': 'The array must have minimum of {{ options.minLength }} items',
  }
}