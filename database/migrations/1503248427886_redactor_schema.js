'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RedactorSchema extends Schema {
  up () {
    this.create('redactors', (table) => {
      table.increments()
      table
        .integer('redactor_id')
        .unsigned()
        .notNullable()
        .unique()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('identifier', 80).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.drop('redactors')
  }
}

module.exports = RedactorSchema
