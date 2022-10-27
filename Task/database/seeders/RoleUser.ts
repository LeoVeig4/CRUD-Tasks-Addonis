import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Role from 'App/Models/Role'
import Env from '@ioc:Adonis/Core/Env'
import Database from '@ioc:Adonis/Lucid/Database'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const trx = await Database.transaction()
    try {
      const user = await User.create(
        {
          username:'leonar',
          email: Env.get('ADMIN_EMAIL'),
          password: Env.get('ADMIN_PASSWORD'),
        },
        { client: trx }
      )
      const role = await Role.findByOrFail('slug', 'admin', trx)
      await trx.insertQuery().table('role_users').insert({
        role_id: role.id,
        user_id: user.id,
      })
      await trx.commit()
    } catch (e) {
      await trx.rollback()
      console.log('Erro ao criar admin')
      console.log(e)
    }
  }
}