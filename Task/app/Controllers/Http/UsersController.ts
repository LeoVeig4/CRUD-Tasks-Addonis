import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'

export default class UsersController {

    public async index({}: HttpContextContract) {
        const user = await User.all()
        return user
      }
      
      public async store({ request }: HttpContextContract) {
        //validator
        const controlData = await request.validate(StoreUserValidator)
        const user = await User.create({
          username: controlData.username,
          password: controlData.password
        })
        console.log(user.$isPersisted)
        return user
      }

      public async show({request}: HttpContextContract) {
        const userId = request.param('id')
        const user = await User.findOrFail(userId)
        return user
      }

      public async update({request}: HttpContextContract) {
        
        const controlData = await request.validate(UpdateUserValidator)
        const userId = request.param('id')
       // const body = request.only(['username', 'password'])
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
