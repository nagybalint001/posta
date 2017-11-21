module.exports = {
    attributes: {
      name: {
        type: 'string',
        required: true,
        unique: true
      },
      value: {
        type: 'string',
        required: true
      }
    }
  }