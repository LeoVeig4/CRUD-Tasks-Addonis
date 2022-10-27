import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import RoleUser from 'App/Models/RoleUserr'



    
//apenas para admin
  Route.group(() => {

    Route.post('users', 'UsersController.store')
    Route.get('users', 'UsersController.index')
    Route.get('users/:id', 'UsersController.show')
    Route.put('users/:id', 'UsersController.update')
    Route.delete('users/:id', 'UsersController.destroy')

    Route.post('addslug', 'AddRolesController.store')
    Route.post('addadmin', 'AddRolesController.create')
    

  }).middleware(['auth', 'role:admin']).prefix('admin').namespace('App/Controllers/Http/Admin')
//não estão funcionando, precisa configurar a tabela de students
  Route.group(() => {

    Route.get('task', 'TaskController.index')
    Route.post('task', 'TaskController.store')
    Route.get('task/:id', 'TaskController.show')
    Route.delete('task/:id', 'TaskController.destroy')
    Route.put('task', 'TaskController.update')

  }).middleware(['auth', 'role:student']).prefix('student').namespace('App/Controllers/Http/Student')
  
  //não ta funcionando carregar a role
  Route.get('loggedas', async ({ auth }) => { //ver aonde está logado
  
      const role= await RoleUser.query().where('user_id', auth.user!.id).join('roles', 'roles.id', 'role_id')
      return `You are logged in as ${auth.user!.username} and your role is ${role}`
    
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
