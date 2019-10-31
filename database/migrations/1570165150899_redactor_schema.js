'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RedactorSchema extends Schema {
  up () {
    this.create('redactors', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254).notNullable().unique()
      table.string('redactor_id').notNullable().unique()
      table.string('password').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('redactors')
  }
}

module.exports = RedactorSchema
