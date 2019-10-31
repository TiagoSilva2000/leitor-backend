'use strict'

class LoginController {
  async store ({ request, auth }) {
    const { email, password, redactor_id } = request.only(['email', 'password'])

    const user = await auth.attempt(email, password)

    return user
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
