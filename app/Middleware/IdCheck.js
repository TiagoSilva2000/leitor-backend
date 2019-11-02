'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IdCheck {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ auth, params, response }, next) {
    const isRed = auth.authenticatorInstance._instanceUser['$attributes'].redFlag;
    const sameId = auth.authenticatorInstance._instanceUser['$attributes'].id === parseInt(params.id)

    if (!isRed && !sameId) {
      return response.status(403).send({
        isRed,
        sameId,
        message: "Access Forbidden!"
      })
    }

    return await next()
  }
}

module.exports = IdCheck
