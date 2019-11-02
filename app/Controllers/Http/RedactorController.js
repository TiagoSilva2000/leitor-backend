'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with redactors
 */

const Redactor = use('App/Models/Redactor')
const User = use('App/Models/User')


class RedactorController {
  async store ({ request }) {
    const {username, password, email, identifier} = request.only([
      'username',
      'password',
      'email',
      'identifier'
    ])
    const redFlag = true

    const newRedactor = await User.create({username, password, email, redFlag})
    newRedactor.identifier = await Redactor.create({redactor_id:newRedactor.id,
        identifier})

    return {username, redFlag, id:newRedactor.id}
  }

  async show ({ params }) {
    const redactor = await User.findOrFail(params.id)

    return redactor
  }

  async update ({ request, auth }) {
    const data = request.only([
      'username',
      'password',
      'email',
    ])
    const usrID = auth.authenticatorInstance._instanceUser['$attributes'].id
    const redactor = await User.findOrFail(usrID)

    redactor.merge(data)
    const {username, id, redFlag} = redactor
    await redactor.save()

    return {username, id, redFlag}
  }

  async destroy ({ auth }) {
    const usrID = auth.authenticatorInstance._instanceUser['$attributes'].id
    const redactor = await User.findOrFail(usrID)

    await redactor.delete()

    return redactor
  }
}
module.exports = RedactorController
