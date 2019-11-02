'use strict'

class RegisterRedactor {
  get validateAll () {
    return true
  }

  get sanizationRules () {
    return {
      email: 'normalize_email'
    }
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required|min:8|confirmed',
      username: 'required',
      identifier:'required'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide a email address!',
      'email.email': 'This is not a valid email, isn\'t it?',
      'email.unique': 'This email was already been registered.',
      'password.required': 'You must provide a password!',
      'password.confirmed': 'You must provide a second copy of your password',
      'username.required': 'You must provide a username!',
      'identifier.required': 'You must provide a identifier.'
    }
  }
}

module.exports = RegisterRedactor
