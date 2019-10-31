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
      if (redInst.dirty.redactor_id) {
        redInst.redactor_id = await Hash.make(redInst.redactor_id)
      }
    })

  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }
}

module.exports = Redactor
