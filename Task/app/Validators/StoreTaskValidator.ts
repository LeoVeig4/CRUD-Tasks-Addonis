import { schema } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    nome: schema.string(),
    info: schema.string.optional()
  })

  public messages = {
    'name.string': 'o nome deve estar em formato string'
  }
}
