const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', router)

app.listen(5001, () => {
  console.log('Server is running...')
})
