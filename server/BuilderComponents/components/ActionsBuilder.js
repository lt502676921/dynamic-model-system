class ActionsBuilder {
  dataIndex
  key
  type

  Actions(actions) {
    this.dataIndex = this.key = this.type = 'actions'
    this.actions = actions
    return this
  }

  setTitle(title) {
    this.title = title
    return this
  }
}

module.exports = ActionsBuilder
