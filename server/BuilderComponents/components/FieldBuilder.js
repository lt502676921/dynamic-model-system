class FieldBuilder {
  title
  dataIndex
  key
  type

  Field(name, title) {
    this.title = title
    this.dataIndex = this.key = name
    return this
  }

  setType(type = 'text') {
    this.type = type

    switch (type) {
      case 'select':
        this.mode = 'multiple'
        break
      case 'trash':
        this.type = 'select'
        this.data = [
          {
            title: 'Only Trashed',
            value: 'onlyTrashed',
          },
          {
            title: 'With Trashed',
            value: 'withTrashed',
          },
          {
            title: 'Without Trashed',
            value: 'withoutTrashed',
          },
        ]
        this.mode = ''
        this.hideInColumn = true
        break

      case 'switch':
        this.data = [
          {
            title: 'Enabled',
            value: 1,
          },
          {
            title: 'Disabled',
            value: 0,
          },
        ]
        break

      default:
        //code...
        break
    }

    return this
  }

  setSorter(value) {
    this.sorter = value
    return this
  }

  setData(data) {
    this.data = data
    return this
  }

  setHideInColumn(value) {
    this.hideInColumn = value
    return this
  }

  setDisabled(value) {
    this.disabled = value
    return this
  }

  setMode(value) {
    this.mode = value
    return this
  }
}

module.exports = FieldBuilder
