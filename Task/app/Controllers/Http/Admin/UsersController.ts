import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import RoleUser from 'App/Models/RoleUserr'
import Role from 'App/Models/Role'
import Student from 'App/Models/Student'

export default class UsersController {

    public async index({}: HttpContextContract) {
        const user = await User.all()
        return user
      }
      
      public async store({ request }: HttpContextContract) {
        
        const controlData = await request.validate(StoreUserValidator)
        const user = await User.create({
          username: controlData.username,
          email: controlData.email,
          password: controlData.password
        })

        const role= await Role.findByOrFail('slug', 'student')

        const student = await Student.create({
          user_id: user.id,
        })
          

        const roleuser = await RoleUser.create({
          user_id: user.id,
          role_id: role.id,
        })
        
        console.log(user.$isPersisted)
        
        return{
          user:user,
          roleuser:roleuser,
          student:student
        }
      }

      public async show({request}: HttpContextContract) {
        const userId = request.param('id')
        const user = await User.findOrFail(userId)
        return user
      }

      public async update({request}: HttpContextContract) {
        
        const controlData = await request.validate(UpdateUserValidator)
        const userId = request.param('id')
        const user = await User.findOrFail(userId)
        await user.merge(controlData).save()
        return user
      }
      
      public async destroy({request}: HttpContextContract) {
        const userId = request.param('id')
        const user= await User.findOrFail(userId)
        await user.delete()
        return true
      }
}
