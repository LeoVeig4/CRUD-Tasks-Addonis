import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoleAddValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    slug: schema.string({}, [
        rules.unique({table: 'roles', column: 'slug'})
    ]),
    description: schema.string.optional()
  })

  public messages = {
    'slug.string': 'o nome deve estar em formato string'
  }
}