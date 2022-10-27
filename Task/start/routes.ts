import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'



    
//apenas para admin
  Route.group(() => {

    Route.post('users', 'UsersController.store')
    Route.get('users', 'UsersController.index')
    Route.get('users/:id', 'UsersController.show')
    Route.put('users/:id', 'UsersController.update')
    Route.delete('users/:id', 'UsersController.destroy')

    Route.post('addslug', 'AddRolesController.store')
    Route.post('addadmin', 'AddRolesController.create')

    Route.get('user', 'AdminsController.index')

  }).middleware(['auth', 'role:admin']).prefix('admin').namespace('App/Controllers/Http/Admin')

  Route.group(() => {

    Route.get('task', 'TasksController.index')
    Route.post('task', 'TasksController.store')
    Route.get('task/:id', 'TasksController.show')
    Route.delete('task/:id', 'TasksController.destroy')
    Route.put('task', 'TasksController.update')

  }).middleware(['auth', 'role:student']).prefix('student').namespace('App/Controllers/Http/Student')
  
  //não ta funcionando carregar a role
  Route.get('loggedas', async ({ auth, response }) => { //ver aonde está logado

      const rolesUser = await Database.query()
      .select('slug as role')
      .from('role_users')
      .where('user_id', auth.user!.id)
      .innerJoin('roles', 'roles.id', 'role_users.role_id')
      const roles = rolesUser.map((value) => value.role)

      return {message: `You are logged in as ${auth.user!.username} and your role is ${roles}`}
    
  }).middleware(['auth'])

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
