import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AdminsController {
    public async index({}: HttpContextContract) {
        const user = await Database.query().select('id', 'username').from('users')
        const student = await Database.query().select('id', 'user_id').from('students')
        const task = await Database.query().select('nome','info','done','user_id').from('tasks')

        
        return {
            user: user,
            student: student,
            tasks: task
            
        }
      }
}
