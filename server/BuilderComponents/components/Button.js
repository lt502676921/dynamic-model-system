class Button {
  constructor() {
    this.component = 'button'
    this.type = 'primary'
    this.action = ''
  }

  Button(value, id = null) {
    this.text = value
    if (id) {
      this.id = id
    }
    return this
  }
  setType(value) {
    this.type = value
    return this
  }

  setAction(value) {
    this.action = value
    return this
  }

  setUri(value) {
    this.uri = value
    return this
  }

  setMethod(value) {
    this.method = value
    return this
  }
}

module.exports = Button
