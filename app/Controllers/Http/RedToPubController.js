'use strict'

const PubReq = use('App/Models/PublishRequest')
const UserToPub = use('App/Controllers/Http/UserToPubController')

class RedToPubController extends UserToPub {
  async index () {
    const pubRequests = PubReq.all()

    return pubRequests
  }

  async update ({ params, request }) {
    const pubRequest = PubReq.findOrFail(params.id)
    const updates = request.only(['answer'])

    pubRequest.merge(updates)

    await pubRequest.save()

    return pubRequest
  }
}

module.exports = RedToPubController
