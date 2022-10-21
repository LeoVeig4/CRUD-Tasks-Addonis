
import Route from '@ioc:Adonis/Core/Route'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'



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


