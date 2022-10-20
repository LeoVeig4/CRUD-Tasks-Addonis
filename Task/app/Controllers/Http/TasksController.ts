import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({}: HttpContextContract) {
    const task= await Task.all()
    return task
  }

  public async create({}: HttpContextContract ) {

  }

  public async store({ auth, request}: HttpContextContract) {
    await auth.use('api').authenticate()
    const body= request.only(['nome', 'info'])
    const tasks = await Task.create({
      user_id: auth.user!.id,
      nome: body.nome,
      info: body.info,
      done: false,
    })

    return tasks
  }

  public async show({auth, request}: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user!
    const userId = request.param('id')

    if(!userId || userId != user.id ){
      return `você não pode acessar essas tasks`
    }
   
    const task = await Task.query().where('user_id', '=', userId)
    return task
  }

  public async update({auth, request}: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user!
    const taskId = request.param('id')
    const task = await Task.findOrFail(taskId)

    if(task.user_id != user.id ){
      return `você não pode mudar a task de outro usuário`
    }

    const body = request.only(['nome', 'info', 'done'])
    await task.merge(body).save()
    return task
  }

  public async destroy({auth, request}: HttpContextContract) {
    await auth.use('api').authenticate()
    const user = auth.user!
    const taskId = request.param('id')
    const task = await Task.findOrFail(taskId)
    if(task.user_id != user.id ){
      return `você não pode excluir essa task`
    }

    const taskexclude= await Task.findOrFail(taskId)
    await taskexclude.delete()
    return true
  }
}
