'use strict'

class LoginController {
  async store ({ request, auth }) {
    const { email, password } = request.only(['email', 'password'])

    const user = await auth.attempt(email, password)

    return user
  }

  async destroy ({ request, auth }) {
    await auth.logout()

    return 'ok, mah boy'
  }
}

module.exports = LoginController
