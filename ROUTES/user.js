const app = module.exports = require('express')()
const userController = require('../CONTROLLER/user')

app.post('/', userController.register)
app.post('/login', userController.login)