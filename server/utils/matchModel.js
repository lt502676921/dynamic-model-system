const { getAllModel } = require('../services/model')
const { getDataByTableName } = require('../services/modelDesign')
const Result = require('../models/Result')

async function matchModel(req, res) {
    let result = await getAllModel()
    let model
    for (let i = 0; i < result.length; i++) {
        if (req.url.indexOf(result[i].route_name) !== -1) {
            model = result[i]
        }
    }
    if (model) {
        let modelData = JSON.parse(model['data'])
        for (let i = 0; i < modelData.tableToolbar.length; i++) {
            modelData.tableToolbar[i].text = modelData.tableToolbar[i].title
            modelData.tableToolbar[i].component = 'button'
        }
        let responseData = {}
        const { data, pagination } = await getDataByTableName(model.table_name)
        responseData['dataSource'] = data
        responseData['meta'] = pagination
        responseData['page'] = {
            searchBar: true,
            title: `${model.route_name}-list`,
            type: "basicList"
        }
        responseData['layout'] = {
            batchToolBar: modelData.batchToolbar,
            tableColumn: modelData.fields,
            tableToolBar: modelData.tableToolbar,
        }
        new Result(responseData, '').success(res)
    }
}

module.exports = { matchModel }