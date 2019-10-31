'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Helpers = use('Helpers')
const File = use('App/Models/File')

class SaveFile {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', {
        size: '1mb',
        types: ['application', 'image'],
        extnames: ['pdf', 'jpeg', 'png']
      })

      if (upload.error) {
        return response
          .status(400)
          .send({ error: { message: 'unallowed format' } })
      }

      const sysName = `${Date.now()}.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: sysName })

      if (!upload.moved()) {
        throw new Error()
      }

      const file = await File.create({
        file: sysName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })
      const { id } = file
      request.file_id = id
      await next()
    } catch (error) {
      return response
        .status(error.status)
        .send(error)
    }
  }
}

module.exports = SaveFile
