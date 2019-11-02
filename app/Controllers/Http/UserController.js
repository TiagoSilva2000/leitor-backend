'use strict'

const User = use('App/Models/User')
const Database = use('Database')

class UserController {
  async store ({ request}) {
    const data = request.only(['username', 'email', 'password'])
    data.redFlag = false
    const {username, id, redFlag} = await User.create(data)

    return {username, id, redFlag}
  }

  async show ({ params }) {
    const {username, id, redFlag, pub_req_sent, pub_req_answ} = await User.findOrFail(params.id)

    return {username, id, redFlag, pub_req_sent, pub_req_answ}
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
    const {username, id, redFlag, pub_req_sent, pub_req_answ} = user

    return {username, id, redFlag, pub_req_sent, pub_req_answ}
  }

  async destroy ({ params, response }) {
    const user = await User.findOrFail(params.id)

    await user.delete()


    return response.send({
      delUID: user.id,
      username: user.username,
      redFlag: user.redFlag,
      message: 'Success!'
    })
  }

}

module.exports = UserController
