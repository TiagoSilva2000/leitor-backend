'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Hash = use('Hash')

class Redactor extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async (redInst) => {
      if (redInst.dirty.password) {
        redInst.password = await Hash.make(redInst.password)
      }
      if (redInst.dirty.identifier) {
        redInst.identifier = await Hash.make(redInst.identifier)
      }
    })

  }

  users () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Redactor
