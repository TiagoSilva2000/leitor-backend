'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RedactorSchema extends Schema {
  up () {
    this.create('redactors', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('redactor_id', 80).notNullable().unique()
      table.string('password').notNullable()
      table.integer('pub_req_answ').defaultTo(0)
      table.integer('pub_req_del').defaultTo(0)
      table.timestamps()
    })
  }

  down () {
    this.drop('redactors')
  }
}

module.exports = RedactorSchema
