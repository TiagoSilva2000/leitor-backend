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
      if (!request.file('file_id')) { return await next() }

      const upload = request.file('file_id', {
        types: ['application', 'image'],
        size: '1mb',
        extnames: ['pdf', 'jpg', 'png']
      })
      const fileError = upload.error()

      if (Object.entries(fileError).length === 0 &&
      fileError.constructor() === Object) {
        return response
        .status(400)
          .send(fileError)
        }

      const sysName = `${Date.now()}l.${upload.subtype}`
      await upload.move(Helpers.tmpPath('uploads'), { name: sysName })

      if (!upload.moved()) {
        // throw new Error()
        return response.send(upload.error())
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
