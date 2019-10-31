'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with publishrequests
 */

const PubReq = use('App/Models/PublishRequest')
const User = use('App/Models/User')
const Helpers = use('Helpers')
const File = use('App/Models/File')

class UserToPubController {
  async store ({ params, request, response }) {
    try {
      const data = request.only([
        'name',
        'description'
      ])

      const newPubReq = await PubReq.create({
        ...data,
        file_id: request.file_id,
        user_id: params.id
      })
      return newPubReq
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Ocorreu um erro na criação da requisição' } })
    }
  }

  async index ({ params, request }) {
    const { fl: file, answ: answer } = request.get()
    const { username, email } = await User.findOrFail(params.id)
    let pubRequests = {}

    if (file || answer) {
      const fileSearch = (file === 'true' ? 'file_id' : 'id')
      const answerSearch = (answer === 'true' ? 'answer' : 'id')

      pubRequests = await PubReq
        .query()
        .where('user_id', params.id)
        .whereNotNull(fileSearch)
        .whereNotNull(answerSearch)
        .fetch()
    } else {
      pubRequests = await PubReq.query()
        .where('user_id', params.id)
        .fetch()
    }
    return { user: { username, email }, pubRequests }
  }

  async show ({ params, response }) {
    const pubRequest = await PubReq.findOrFail(params.id)

    if (pubRequest.file_id) {
      const file = await File.findOrFail(pubRequest.file_id)
      return response
        .download(Helpers.tmpPath(`uploads/${file.file}`))
        // .send(pubRequest)
    }

    return pubRequest
  }

  async update ({ params, request }) {
    const pubRequest = await PubReq.findOrFail(params.id)
    const updates = request.only([
      'file_id',
      'name',
      'description'
    ])

    pubRequest.merge(updates)

    await pubRequest.save()

    return pubRequest
  }

  async destroy ({ params }) {
    const pubReq = await PubReq.findOrFail(params.id)

    await pubReq.delete()

    return pubReq
  }
}
module.exports = UserToPubController
