'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PublishRequest extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  file () {
    return this.hasOne('App/Models/File')
  }
}

module.exports = PublishRequest
