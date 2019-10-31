'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
  async store ({ request, response, auth }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    // await auth.attempt(data.email, data.password)

    return user
  }

  async index () {
    const allUsers = await User.all()

    return allUsers
  }

  async show ({ auth, params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async update ({ params, request }) {
    const user = await User.findOrFail(params.id)
    const updates = request.only([
      'username',
      'password',
      'email'
    ])

    user.merge(updates)

    await user.save()

    return user
  }

  async destroy ({ params }) {
    const user = await User.findOrFail(params.id)

    await user.delete()

    return user
  }

  async reset () {
    await Database
      .table('users')
      .where('id', '!=', '58468')
      .del()

    return 'Deleteds'
  }

  async test ({ params }) {

  }
}

module.exports = UserController
