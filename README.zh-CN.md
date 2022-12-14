# 动态模型系统



[English](https://github.com/lt502676921/dynamic-model-system/blob/main/README.md)  |  简体中文



## 介绍

一个低代码思想的系统，通过表单填写，生成相应模块、页面。

在中后台管理系统的实践过程中，发现大多数场景具有相似性，思考如何批量生产此类页面的过程中，设计沉淀出了此系统。

#### 第一阶段：

- 在服务端定义描述页面中某一区块的布局所需的字段，输出成套的配置信息。
- 客户端拿到配置信息后传递给封装好的组件，即可生成页面。

在实际工作中，前端工程师可以通过 BFF层 承接服务端返回的数据，对数据进行包装（在数据中加入页面布局信息）后，返回给展现层，在展现层封装组件，即可通过配置页面布局信息，批量生产相似页面。

#### 第二阶段：

- 展现层整理需要填写的内容，开发表单页面，提供给操作人
- 操作人填写表单，通过表单描述页面的布局，由此，页面如何布局由操作人自定义
- 服务端解析前端提交的布局信息后，执行相应的操作（建表，菜单表、模型表写入数据）
- 当前端自己通过配置生成的页面时，服务端把前端传入的配置信息返回，页面呈现。

在实际工作中，将表单配置页对运营、产品等业务相关人员开放，业务人员即可通过配置，“开发”模块与页面。

### 说明

- 这套方案可应用于具有相似性页面的生成，若页面需要高度定制化，此方案并不适用。
- 另外，若现有架构下，没有BFF层，建议推动现有的服务端进行改造。设立BFF层承接原有的服务，会提高系统的不稳定性，需要相应的运维配套去保障服务的稳定性，该考虑当前业务体量下是否有必要设立BFF层。



## 技术选型

- 前端：React，Ant Design Pro，Formily v1
- 服务端：Nodejs，Express
- 数据库：MySQL
- 鉴权：JWT



## 设计思路

- 系统内原有模块
  - 路由层
    - 从 service 层（来自数据库）获取数据
    - 从 model 层获取布局信息
    - 返回 `{ 数据, 布局信息 }`

- 通过模型设计生产的模块
  - 路由层
    - 检查路由名
    - 从数据库中获取数据和布局信息
    - 返回`{ 数据, 布局信息 }`



## 使用

```bash
$ git clone https://github.com/lt502676921/dynamic-model-system.git
# 启动数据库
# 在数据库中导入 sql 文件
# 修改服务端连接数据库的配置
$ cd server
$ npm install
$ node app.js

$ cd antDPro-client
$ npm install
$ npm start
```







