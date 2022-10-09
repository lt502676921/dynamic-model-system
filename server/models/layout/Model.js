const Builder = require('../../BuilderComponents/Builder')

function listBuilder(addonData = [], param = []) {
    let tableToolBar = [
        new Builder().button('Add', 'add').setType('primary').setAction('modal').setUri('/api/models/add'),
        new Builder().button('Reload').setType('default').setAction('reload'),
    ];
    let batchToolBar = [];
    let tableColumn = [
        new Builder().field('title', 'Model Title').setType('text'),
        new Builder().field('table_name', 'Table Name').setType('text'),
        new Builder().field('route_name', 'Route Name').setType('text'),
        new Builder().field('create_time', 'Create Time').setType('datetime').setSorter(true),
        new Builder().field('status', 'Status').setType('switch').setData(addonData['status']),
        new Builder()
            .actions([
                new Builder().button('Edit').setType('primary').setAction('page').setUri('/api/models/:id'),
                new Builder().button('Design').setType('primary').setAction('modelDesign').setUri('/api/models/design/:id'),
                new Builder()
                    .button('Delete')
                    .setType('default')
                    .setAction('delete')
                    .setUri('/api/models/delete')
                    .setMethod('post'),
            ])
            .setTitle('Action'),
    ];

    return new Builder()
        .page('Model List')
        .setType('basicList')
        .setSearchBar(true)
        .setTableColumn(tableColumn)
        .setTableToolBar(tableToolBar)
        .setBatchToolBar(batchToolBar)
}

function addBuilder(addonData = []) {
    let basic = [
        new Builder().field('title', 'Model Title').setType('text'),
        new Builder().field('table_name', 'Table Name').setType('text'),
        new Builder().field('route_name', 'Route Name').setType('text'),
        new Builder().field('create_time', 'Create Time').setType('datetime'),
        new Builder().field('status', 'Status').setType('switch').setData(addonData['status']),
    ];
    let action = [
        new Builder().button('Reset').setType('dashed').setAction('reset'),
        new Builder().button('Cancel').setType('default').setAction('cancel'),
        new Builder().button('Submit').setType('primary').setAction('submit').setUri('/api/models').setMethod('post'),
    ];

    return new Builder()
        .page('Model Add')
        .setType('page')
        .setTab(basic)
        .setAction(action)
}

function editBuilder(id, addonData = []) {
    let basic = [
        new Builder().field('title', 'Model Title').setType('text').setDisabled(true),
        new Builder().field('table_name', 'Table Name').setType('text').setDisabled(true),
        new Builder().field('route_name', 'Route Name').setType('text').setDisabled(true),
        new Builder().field('create_time', 'Create Time').setType('datetime'),
        new Builder().field('update_time', 'Update Time').setType('datetime'),
        new Builder().field('status', 'Status').setType('switch').setData(addonData['status']),
    ];
    let dataTab = [
        new Builder().field('data', 'Model Data').setType('textarea'),
    ];
    let action = [
        new Builder().button('Reset').setType('dashed').setAction('reset'),
        new Builder().button('Cancel').setType('default').setAction('cancel'),
        new Builder().button('Submit').setType('primary').setAction('submit').setUri(`/api/models/${id}`).setMethod('put'),
    ];

    return new Builder()
        .page('Model Edit')
        .setType('page')
        .setTab(basic)
        .setTab(dataTab, 'data-tab', 'Data')
        .setAction(action)
}

module.exports = { listBuilder, addBuilder, editBuilder }