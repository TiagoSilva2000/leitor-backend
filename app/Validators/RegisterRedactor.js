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
      redactor_id:'required'
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
      'redactor_id.required': 'You must provide a redactor id.'
    }
  }
}

module.exports = RegisterRedactor
