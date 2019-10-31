'use strict'

class PublishRequest {
  get validateAll () {
    return true
  }

  get messages () {
    return {
      'user_id.required': 'Who are you?',
      'user_id.integer': 'Invalid User ID',
      'file_id.integer': 'Invalid File ID',
      'name.required': 'You must provide a title'
    }
  }

  get rules () {
    return {
      user_id: 'required|integer',
      file_id: 'integer',
      name: 'required'
    }
  }
}

module.exports = PublishRequest
