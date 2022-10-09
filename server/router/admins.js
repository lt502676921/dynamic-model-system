const express = require('express')
const { md5 } = require('../utils')
const { PWD_SALT } = require('../utils/constant')
const { listBuilder, addBuilder, editBuilder } = require('../models/layout/Admin')
const { getUserList, findUserById, addUser, editUser, deleteUser } = require('../services/user')
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

//查询用户列表,带布局
router.get('/', function (req, res) {
  let layout = listBuilder(addonData)
  const { page, per_page } = req.query
  getUserList(page, per_page).then((data) => {
    if (data) {
      layout['dataSource'] = data.data
      layout['meta'] = data.pagination
      new Result(layout, '').success(res)
    }
  })
})

//添加用户的表单布局
router.get('/add', function (req, res) {
  let layout = addBuilder(addonData)
  new Result(layout, '').success(res)
})

//根据用户id获取用户信息，带编辑表单布局
router.get('/:id', async function (req, res) {
  let layout = editBuilder(addonData, req.params.id)
  findUserById(req.params.id).then((user) => {
    layout['dataSource'] = user
    new Result(layout, '').success(res)
  }).catch(() => {
    new Result('获取用户信息失败!').fail(res)
  })
})

//添加新用户
router.post('/', function (req, res) {
  let { username, password, nickname, status } = req.body
  password = md5(`${password}${PWD_SALT}`)
  status = status ? 1 : 0
  let create_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  let update_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  const params = {
    username,
    password,
    nickname,
    create_time,
    update_time,
    status
  }
  addUser(params).then(() => {
    new Result('添加成功!').success(res)
  }).catch((e) => {
    console.log(e);
    new Result('添加失败!').fail(res)
  })
})

//编辑用户
router.put('/:id', async function (req, res) {
  let { nickname, status } = req.body
  let user = await findUserById(req.params.id)
  if (user) {
    let update_time = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    status = status ? 1 : 0
    let params = {
      nickname, update_time, status
    }
    editUser(req.params.id, params).then(() => {
      new Result('修改成功!').success(res)
    }).catch(() => {
      new Result('修改失败!').fail(res)
    })
  } else {
    new Result('查询不到相关用户!').fail(res)
  }
})

//删除（批量删除）
router.post('/delete', function (req, res) {
  const { ids, type } = req.body
  if (ids) {
    for (let i = 0; i < ids.length; i++) {
      deleteUser(ids[i]).catch(() => {
        new Result('删除失败!').fail(res)
      })
    }
    new Result('删除成功!').success(res)
  } else {
    new Result('不要玩删除接口!').fail(res)
  }
})

module.exports = router
