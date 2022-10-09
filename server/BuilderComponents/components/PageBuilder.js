class PageBuilder {
  page = {}
  layout = {
    tabs: []
  }

  Page(title) {
    this.page['title'] = title
    return this
  }

  setType(type) {
    this.page['type'] = type
    return this
  }

  setSearchBar(value = false) {
    this.page['searchBar'] = value
    return this
  }

  setTableToolBar(tableToolBar) {
    this.layout['tableToolBar'] = tableToolBar
    return this
  }

  setBatchToolBar(batchToolBar) {
    this.layout['batchToolBar'] = batchToolBar
    return this
  }

  setTableColumn(tableColumn) {
    this.layout['tableColumn'] = tableColumn
    return this
  }

  // Layout
  setTab(data, name = 'basic', title = 'Basic') {
    let tab = {
      'name': name,
      'title': title,
      'data': data,
    }
    this.layout['tabs'].push(tab)
    return this
  }

  sidebar(data, name = 'sidebar', title = 'Sidebar') {
    //   sidebar = [
    //     'name' =>   name,
    //     'title' =>   title,
    //     'data' =>   data,
    // ];
    // this.layout['sidebars'][] =   sidebar;
    return this
  }

  setAction(data, name = 'actions', title = 'Actions') {
    let action = {
      'name': name,
      'title': title,
      'data': data,
    }
    this.layout['actions'] = []
    this.layout['actions'][0] = action;
    return this
  }

  actions(data) {
    this.layout['actions'] = data
    return this
  }
}

module.exports = PageBuilder
