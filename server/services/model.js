const { querySql, queryOne } = require('../db')

function getAllModel() {
    return querySql(`select * from model`)
}

async function getModelList(page = 1, per_page = 10) {
    let data = await querySql(`select * from model limit ${(page - 1) * per_page},${page * per_page}`)
    let [{ total }] = await querySql(`select count(*) total from model`)
    let pagination = {
        page: +page,
        per_page: +per_page,
        total,
    }
    return { data, pagination }
}

function addModel(params) {
    const { title, table_name, route_name, create_time, update_time, status, data } = params
    return querySql(`insert into model (title, table_name, route_name, create_time, update_time, status, data)values('${title}','${table_name}','${route_name}','${create_time}','${update_time}','${status}','${data}')`)
}

function findModelById(id) {
    return queryOne(`select id,title,table_name,route_name,status,data from model where id='${id}'`)
}

function editModel(id, params) {
    const { data, update_time } = params
    return querySql(`update model set update_time='${update_time}',data='${data}' where id='${id}'`)
}

function deleteModel(id) {
    return querySql(`delete from model where id='${id}'`)
}

module.exports = { getAllModel, getModelList, addModel, findModelById, editModel, deleteModel }
