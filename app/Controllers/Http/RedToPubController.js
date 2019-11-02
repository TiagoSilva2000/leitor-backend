'use strict'

const PubReq = use('App/Models/PublishRequest')
const File = use('App/Models/File')
const Helpers = use('Helpers')

class RedToPubController {
  async index ({request, response}) {
    const {date} = request.get()

    if (date) {
      const pubRequests = await PubReq
        .query()
        .where('format_date', date)
        .fetch()
      return pubRequests
    }

    const pubRequests = await PubReq.all()

    return pubRequests
  }

  async show ({params, response}) {
    const pubRequest = await PubReq.findOrFail(params.id)

    if (pubRequest.file_id) {
      const file = await File.findOrFail(pubRequest.file_id)
      return response
        .send({pubRequest, linkToFile:Helpers.tmpPath(`uploads/${file.file}`)})
    }

    return response.send(pubRequest)
  }

  async update ({ params, request }) {
    const pubRequest = await PubReq.findOrFail(params.id)
    const updates = request.only([
      'answer',
      'answered_by'
    ])
    if (!updates.answered_by)
      updates.answered_by = null


    pubRequest.merge(updates)

    await pubRequest.save()

    return pubRequest
  }

  async destroy ({params}) {
    const pubRequest = await PubReq.findOrFail(params.id)

    if (pubRequest.file_id) {
      const file = await File.findOrFail(pubRequest.file_id)
      await file.delete()
    }
    await pubRequest.delete()

    return pubRequest
  }
}

module.exports = RedToPubController
