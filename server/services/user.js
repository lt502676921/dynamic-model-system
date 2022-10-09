const { querySql, queryOne } = require('../db')

function login(username, password) {
  return querySql(`select * from user where username='${username}' and password='${password}' `)
}

function findUser(username) {
  return queryOne(`select id,username,nickname,role,avatar from user where username='${username}'`)
}

function getMenuList(params) {
  return querySql(`select * from menu`)
}

async function getUserList(page = 1, per_page = 10) {
  let data = await querySql(`select * from user limit ${(page - 1) * per_page},${page * per_page}`)
  let [{ total }] = await querySql(`select count(*) total from user`)
  let pagination = {
    page: +page,
    per_page: +per_page,
    total,
  }
  return { data, pagination }
}

function findUserById(id) {
  return queryOne(`select id,username,nickname,role,avatar,status from user where id='${id}'`)
}

function addUser(params) {
  const { username, password, nickname, create_time, update_time, status } = params
  return querySql(`insert into user (username,password,nickname,create_time,update_time,status)values('${username}','${password}','${nickname}','${create_time}','${update_time}','${status}')`)
}

function editUser(id, params) {
  const { nickname, update_time, status } = params
  return querySql(`update user set nickname='${nickname}',update_time='${update_time}',status='${status}' where id='${id}'`)
}

function deleteUser(id) {
  return querySql(`delete from user where id='${id}'`)
}

module.exports = { login, findUser, getMenuList, getUserList, findUserById, addUser, editUser, deleteUser }
