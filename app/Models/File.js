'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class File extends Model {
  publishrequest () {
    return this.belongsTo('App/Models/PublishRequest')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = File
