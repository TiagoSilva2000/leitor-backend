'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PublishRequestSchema extends Schema {
  up () {
    this.create('publish_requests', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('name').notNullable()
      table.text('description').notNullable()
      table.text('answer')
      table.string('answered_by')
      table.timestamps()
    })
  }

  // 1570163572465_publish_request_schema.js
  down () {
    this.drop('publish_requests')
  }
}

module.exports = PublishRequestSchema
