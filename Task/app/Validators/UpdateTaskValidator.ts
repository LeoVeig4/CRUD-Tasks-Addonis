import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string.optional(),
    info: schema.string.optional(),
    done: schema.boolean.optional()
  })

  public messages = {
    'name.string': 'o nome deve estar em formato string'
  }
}
