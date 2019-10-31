'use strict'

const PubReq = use('App/Models/PublishRequest')
const File = use('App/Models/File')
const Database = use('Database')

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

  async show ({params}) {
    const pubRequest = await PubReq.findOrFail(params.pubId)


    return pubRequest
  }

  async update ({ params, request }) {
    const pubRequest = await PubReq.findOrFail(params.pubId)
    const updates = request.only([
      'answer',
      'answered_by'
    ])

    pubRequest.merge(updates)

    await pubRequest.save()

    return pubRequest
  }

  async destroy ({params}) {
    const pubRequest = await PubReq.findOrFail(params.pubId)

    if (pubRequest.file_id) {
      const file = await File.findOrFail(pubRequest.file_id)
      await file.delete()
    }
    await pubRequest.delete()

    return pubRequest
  }
}

module.exports = RedToPubController
