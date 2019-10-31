'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')
const Env = use('Env')

class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages)
    }
    if (Env.get('NODE_ENV') === 'development') {
      return response.status(error.status).send(error)
    }

    return response.status(error.status).send(error)
  }

  // /**
  //  * Report exception for logging or debugging.
  //  *
  //  * @method report
  //  *
  //  * @param  {Object} error
  //  * @param  {Object} options.request
  //  *
  //  * @return {void}
  //  */
  // async report (error, { request }) {
  // }
}

module.exports = ExceptionHandler
