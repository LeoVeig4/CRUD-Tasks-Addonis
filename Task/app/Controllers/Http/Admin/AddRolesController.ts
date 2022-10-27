import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import User from 'App/Models/User'
import StoreUserValidator from 'App/Validators/StoreUserValidator'
import RoleAddValidator from 'App/Validators/RoleAddValidator'
import RoleUser from 'App/Models/RoleUserr'
import Admin from 'App/Models/Admin'
export default class AddRolesController {

    public async store({ request}: HttpContextContract) {
    
        const controlData = await request.validate(RoleAddValidator)
        const role = await Role.create({
          slug: controlData.slug,
          description: controlData.description
        })
        return role
      }
      public async create({ request}: HttpContextContract) {

        const controlData = await request.validate(StoreUserValidator)
        const user = await User.create({
          username: controlData.username,
          email: controlData.email,
          password: controlData.password
        })
        
        const role= await Role.findByOrFail('slug', 'admin')
        
        const admin= await Admin.create({
          user_id: user.id
        })

        const roleuser = await RoleUser.create({
          user_id: user.id,
          role_id: role.id,
        })
        return roleuser
      }
}
