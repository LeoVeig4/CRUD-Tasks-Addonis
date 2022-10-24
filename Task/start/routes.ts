import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'

  Route.post('users', 'UsersController.store')

//apenas para 
  Route.group(() => {

    Route.get('users', 'UsersController.index')
    Route.get('users/:id', 'UsersController.show')
    Route.put('users/:id', 'UsersController.update')//precisa ser ou admin ou a pessoa
    Route.delete('users/:id', 'UsersController.destroy')

  }).middleware(['auth'])

  Route.group(() => {

    Route.get('task', 'TaskController.index')
    Route.post('task', 'TaskController.store')
    Route.get('task/:id', 'TaskController.show')
    Route.delete('task/:id', 'TaskController.destroy')
    Route.put('task', 'TaskController.update')

  }).middleware(['auth'])
  
  Route.get('loggedas', async ({ auth }) => { //ver aonde está logado
    await auth.use('api').authenticate()
    return `You are logged in as ${auth.user!.username}`
  })

//rota com problema
Route.post('login', async ({ auth, request, response }: HttpContextContract) => {

  const loginSchema = schema.create({
    username: schema.string(),
    password: schema.string({}, [rules.minLength(4)])
  })

  const data = await request.validate({schema: loginSchema}) 
  // Lookup user manually
  const user = await User
    .query()
    .where('username', data.username!)
    .firstOrFail()

  // Verify password
  if (!(await Hash.verify(user.password, data.password))) {
    return response.unauthorized('Invalid credentials')
  }

  // Generate token
  const token = await auth.use('api').generate(user)
  return token
})
