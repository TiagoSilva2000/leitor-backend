'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with redactors
 */

const Redactor = use('App/Models/Redactor')

class RedactorController {
  async store ({ request }) {
    const data = request.only([
      'username',
      'password',
      'email'
    ])

    const newRedactor = await Redactor.create(data)

    return newRedactor
  }

  async index () {
    const redactors = await Redactor.all()

    return redactors
  }

  async show ({ params }) {
    const redactor = await Redactor.findOrFail(params.id)

    return redactor
  }

  async update ({ params, request }) {
    const data = request.only([
      'username',
      'password',
      'email'
    ])
    const redactor = await Redactor.findOrFail(params.id)

    redactor.merge(data)
    await redactor.save()

    return redactor
  }

  async destroy ({ params }) {
    const redactor = await Redactor.findOrFail(params.id)

    await redactor.delete()

    return redactor
  }
}
module.exports = RedactorController
