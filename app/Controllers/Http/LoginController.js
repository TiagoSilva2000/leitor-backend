'use strict'

const Redactor = use('App/Models/Redactor')

class LoginController {
  async store ({ request, auth }) {
    const { email, password } = request.only(['email', 'password', 'identifier'])

    const {username, redFlag, id, pub_req_sent, pub_req_answ} = await auth.attempt(email, password)

    return {username, redFlag, id, pub_req_sent, pub_req_answ }
  }

  async destroy ({ auth, response }) {
    try
    {
      await auth.logout()

      return response.send({message:"success!"})
    } catch (e) {
      return response.send({message:"error!"})
    }
  }
}

module.exports = LoginController
