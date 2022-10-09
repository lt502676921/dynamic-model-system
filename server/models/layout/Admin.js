const Builder = require('../../BuilderComponents/Builder')

function listBuilder(addonData = [], param = []) {
  let tableToolBar = [
    new Builder().button('Add', 'add').setType('primary').setAction('modal').setUri('/api/admins/add'),
    new Builder().button('Page add').setType('default').setAction('page').setUri('/api/admins/add'),
    new Builder().button('Reload').setType('default').setAction('reload'),
  ]
  let batchToolBar = [
    new Builder().button('Delete').setType('danger').setAction('delete').setUri('/api/admins/delete').setMethod('post'),
    new Builder().button('Disable').setType('default').setAction('batchDisable'),
  ]
  let tableColumn = [
    new Builder().field('username', 'Username').setType('text'),
    new Builder().field('nickname', 'Nick Name').setType('text'),
    new Builder().field('create_time', 'Create Time').setType('datetime').setSorter(true),
    new Builder().field('status', 'Status').setType('switch').setData(addonData['status']),
    new Builder()
      .actions([
        new Builder().button('Edit').setType('primary').setAction('modal').setUri('/api/admins/:id'),
        new Builder().button('Page edit').setType('default').setAction('page').setUri('/api/admins/:id'),
        new Builder()
          .button('Delete')
          .setType('default')
          .setAction('delete')
          .setUri('/api/admins/delete')
          .setMethod('post'),
      ])
      .setTitle('Action'),
  ]

  return new Builder()
    .page('User List')
    .setType('basicList')
    .setSearchBar(true)
    .setTableColumn(tableColumn)
    .setTableToolBar(tableToolBar)
    .setBatchToolBar(batchToolBar)
}

function addBuilder(addonData = []) {
  let basic = [
    new Builder().field('username', 'Username').setType('text'),
    new Builder().field('password', 'Password').setType('text'),
    new Builder().field('nickname', 'Nick Name').setType('text'),
    new Builder().field('create_time', 'Create Time').setType('datetime'),
    new Builder().field('update_time', 'Update Time').setType('datetime'),
    new Builder().field('status', 'Status').setType('switch').setData(addonData['status']),
  ]
  let action = [
    new Builder().button('Reset').setType('dashed').setAction('reset'),
    new Builder().button('Cancel').setType('default').setAction('cancel'),
    new Builder().button('Submit').setType('primary').setAction('submit').setUri('/api/admins').setMethod('post'),
  ]
  return new Builder()
    .page('User Add')
    .setType('page')
    .setTab(basic)
    .setAction(action)
}

function editBuilder(addonData = [], id) {
  let basic = [
    new Builder().field('username', 'Username').setType('text').setDisabled(true),
    new Builder().field('nickname', 'Nick Name').setType('text'),
    new Builder().field('create_time', 'Create Time').setType('datetime'),
    new Builder().field('update_time', 'Update Time').setType('datetime'),
    new Builder().field('status', 'Status').setType('switch').setData(addonData['status']),
  ]
  let action = [
    new Builder().button('Reset').setType('dashed').setAction('reset'),
    new Builder().button('Cancel').setType('default').setAction('cancel'),
    new Builder().button('Submit').setType('primary').setAction('submit').setUri(`/api/admins/${id}`).setMethod('put'),
  ]
  return new Builder()
    .page('User Edit')
    .setType('page')
    .setTab(basic)
    .setAction(action)
}

module.exports = { listBuilder, addBuilder, editBuilder }
