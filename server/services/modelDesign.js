const { querySql, queryOne } = require('../db')

function addMenu(params) {
    const {
        parent_id,
        name,
        icon,
        path,
        hideInMenu,
        hideChildrenInMenu,
        flatMenu,
        status,
        create_time,
        update_time
    } = params
    return querySql(
        `insert into menu (parent_id,name,icon,path,hideInMenu,hideChildrenInMenu,flatMenu,status,create_time,update_time)
        values('${parent_id}','${name}','${icon}','${path}','${hideInMenu}','${hideChildrenInMenu}','${flatMenu}','${status}','${create_time}','${update_time}')`
    )
}

function createTable(tableName) {
    return querySql(`CREATE TABLE ${tableName} ( id INT UNSIGNED NOT NULL AUTO_INCREMENT , create_time DATETIME NOT NULL , update_time DATETIME NOT NULL , delete_time DATETIME NULL DEFAULT NULL , status TINYINT(1) NOT NULL DEFAULT '1' , PRIMARY KEY (id)) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci;`)
}

function alterTable(tableName, params) {
    let fieldSqlArray = [];
    for (let field of params['fields']) {
        console.log('field', field);
        let type = 'VARCHAR'
        let typeAddon = '(255)'
        let theDefault = ''

        switch (field['type']) {
            case 'number':
                type = 'INT';
                typeAddon = ' UNSIGNED';
                break;
            case 'datetime':
                type = 'DATETIME';
                typeAddon = '';
                break;
            case 'tag':
            case 'switch':
                type = 'TINYINT';
                typeAddon = '(1)';
                theDefault = 'DEFAULT 1';
                break;
            case 'longtext':
                type = 'LONGTEXT';
                typeAddon = '';
                break;
            default:
                break;
        }
        fieldSqlArray.push(`ADD ${field['name']} ${type}${typeAddon} NOT NULL ${theDefault}`)
    }
    for (let i = 0; i < fieldSqlArray.length; i++) {
        let alterTableSql = `ALTER TABLE ${tableName} ${fieldSqlArray[i]}`
        querySql(alterTableSql)
    }
}

async function getDataByTableName(tableName, page = 1, per_page = 10,) {
    let data = await querySql(`select * from ${tableName} limit ${(page - 1) * per_page},${page * per_page}`)
    let [{ total }] = await querySql(`select count(*) total from ${tableName}`)
    let pagination = {
        page: +page,
        per_page: +per_page,
        total,
    }
    return { data, pagination }
}

function deleteTable(tableName) {
    return querySql(`drop table ${tableName}`)
}

async function deleteMenuByRouteName(routeName) {
    let menuData = await querySql(`select * from menu`)
    let menuIds = []
    for (let i = 0; i < menuData.length; i++) {
        if (menuData[i].path.indexOf(routeName) !== -1) {
            menuIds.push(menuData[i].id)
        }
    }
    for (let i = 0; i < menuIds.length; i++) {
        querySql(`delete from menu where id='${menuIds[i]}'`)
    }
}

module.exports = { addMenu, createTable, alterTable, getDataByTableName, deleteTable, deleteMenuByRouteName }