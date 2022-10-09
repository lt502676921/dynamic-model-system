const express = require('express')
const { listBuilder, addBuilder, editBuilder } = require('../models/layout/Model')
const { getModelList, addModel, findModelById, editModel, deleteModel } = require('../services/model')
const { addMenu, createTable, alterTable, deleteTable, deleteMenuByRouteName } = require('../services/modelDesign')
const Result = require('../models/Result')
const moment = require('moment')

const router = express.Router()

let addonData = {
    status: [{
        title: 'Enabled',
        value: 1
    }, {
        title: 'Disabled',
        value: 0
    }]
}

//模型列表，带布局
router.get('/', function (req, res) {
    let layout = listBuilder(addonData)
    const { page, per_page } = req.query
    getModelList(page, per_page).then((data) => {
        if (data) {
            layout['dataSource'] = data.data
            layout['meta'] = data.pagination
            new Result(layout, '').success(res)
        }
    })
})

//添加模型用的表单布局
router.get('/add', function (req, res) {
    let layout = addBuilder(addonData)
    new Result(layout, '').success(res)
})

//添加新模型
router.post('/', function (req, res) {
    let { title, table_name, route_name, status } = req.body
    let create_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    let update_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    let data = {
        routeName: route_name
    }
    status = status ? 1 : 0
    const params = { title, table_name, route_name, create_time, update_time, status, data: JSON.stringify(data) }
    addModel(params).then(() => {
        new Result('添加成功!').success(res)
    }).catch((e) => {
        console.log(e);
        new Result('添加失败!').fail(res)
    })
})

//根据模型id获取模型信息，带编辑表单布局
router.get('/:id', async function (req, res) {
    let layout = editBuilder(addonData, req.params.id)
    findModelById(req.params.id).then((model) => {
        layout['dataSource'] = model;
        new Result(layout, '').success(res)
    }).catch(() => {
        new Result('获取模型信息失败!').fail(res)
    })
})

//删除（批量删除）
router.post('/delete', async function (req, res) {
    const { ids, type } = req.body
    if (ids) {
        for (let i = 0; i < ids.length; i++) {
            let model = await findModelById(ids[i])
            deleteModel(ids[i])
            deleteTable(model.table_name)
            deleteMenuByRouteName(model.route_name)
        }
        new Result('删除成功!').success(res)
    } else {
        new Result('不要玩删除接口!').fail(res)
    }
})

router.get('/design/:id', function (req, res) {
    findModelById(req.params.id).then((model) => {
        model['data'] = JSON.parse(model['data'])
        new Result(model, '').success(res)
    }).catch(() => {
        new Result('获取模型信息失败!').fail(res)
    })
})

router.put('/design/:id', async function (req, res) {
    let { data } = req.body
    let model = await findModelById(req.params.id)
    if (model) {
        console.log('model', model);
        let update_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        let params = { data: JSON.stringify(data), update_time }
        editModel(req.params.id, params).then(() => {
            new Result('修改成功!').success(res)
        }).catch((e) => {
            console.log(e);
            new Result('修改失败!').fail(res)
        })
        let menuParams = {
            parent_id: 0,
            name: `${model.route_name}-list`,
            icon: 'icon-project',
            path: `/basic-list/api/${model.route_name}`,
            hideInMenu: 0,
            hideChildrenInMenu: 0,
            flatMenu: 0,
            status: 1,
            create_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
            update_time: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        }
        createTable(model.table_name).then(() => {
            return alterTable(model.table_name, data)
        }).then(() => {
            addMenu(menuParams)
        })
    } else {
        new Result('查询不到相关模型!').fail(res)
    }
})

module.exports = router