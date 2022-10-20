
import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import TasksController from 'App/Controllers/Http/TasksController'

Route.post('login', async ({ auth, request, response }) => {
    const username = request.input('username')
    const password = request.input('password')
  
    // Lookup user manually
    const user = await User
      .query()
      .where('username', username)
      .firstOrFail()
  
    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized('Invalid credentials')
    }
  
    // Generate token
    const token = await auth.use('api').generate(user)
    return token
  })

  Route.get('loggedas', async ({ auth }) => { //ver aonde está logado
    await auth.use('api').authenticate()
    return `You are logged in as ${auth.user!.username}`
  })

  Route.resource('task', 'TasksController')


Route.resource('users', 'UsersController')
