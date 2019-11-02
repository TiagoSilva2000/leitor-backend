'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const File = use('App/Models/File')
const Helpers = use('Helpers')

class FileController {
  async show ({ params, response, auth }) {
    const file = await File.findOrFail(params.fileId)
    
    return response.download(Helpers.tmpPath(`uploads/${file.file}`))
  }
}
module.exports = FileController
